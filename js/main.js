M.AutoInit()

function game() {
    let runda = 1
    let counter = document.getElementById("runda")
    counter.innerText = runda

    let attackButton = document.getElementById("attack")
    let healButton = document.getElementById("heal")
    let shieldButton = document.getElementById("shield")
    let superButton = document.getElementById("superAttack")

    class Entity {
        constructor(health, damage, heal) {
            this.health = health
            this.damage = damage
            this.maxHealth = health
            this.healIncrease = heal
        }

        attack(p2) {
            p2.health -= this.damage
            p2.update()
        }

        heal() {
            this.health += this.healIncrease
            let razlika = 0
            if (this.health > this.maxHealth) {
                razlika = this.health - this.maxHealth
                this.health -= razlika
            }
        }
    }

    class Enemy extends Entity {
        constructor(health, damage, heal) {
            super(health, damage, heal)
            this.update()

            let enemyDmg = document.getElementById("enemyDmg")
            enemyDmg.innerText = `Damage: ${this.damage}`
        }

        update() {
            let healthBar = document.getElementById("enemyHealth")
            healthBar.value = this.health
            healthBar.max = this.maxHealth
        }
    }

    class Player extends Entity {
        constructor(health, damage, shield, heal, superX) {
            super(health, damage, heal)
            this.shieldPercent = 0
            this.shieldCharge = shield
            this.activeShield = false
            this.superAttackMultiplier = 3
            this.superCharge = superX
            this.attackCount = 0
            this.update()

            let playerDmg = document.getElementById("playerDmg")
            playerDmg.innerText = `Damage: ${this.damage}`
        }

        update() {
            let healthBar = document.getElementById("playerHealth")
            healthBar.value = this.health
            healthBar.max = this.maxHealth
        }

        shield(e) {
            this.health += Math.floor(e.damage * (this.shieldPercent/this.shieldCharge))
        }

        superAttack(e) {
            if (this.attackCount == this.superCharge) {
                for (let i = 0; i < this.superAttackMultiplier; i++) {
                    this.attack(e)
                }
                this.attackCount = 0
                superButton.innerText = `U 0%`
                return true
            }

            M.toast({ html: "Can't use super" })
            return false
        }
    }

    let p1 = new Player(player.health, player.damage, player.shield, player.heal, player.super)
    let e1 = new Enemy(50 + (runda - 1) * 10, 10 + (runda - 1) * 10, 10 + (runda - 1) * 5)

    let playerImg = document.getElementById("playerImg")
    let enemyImg = document.getElementById("enemyImg")

    function damagedEnemy() {
        enemyImg.classList.add("damaged")
        setTimeout(() => {
            enemyImg.classList.remove("damaged")
        }, 1000)
    }

    function damagedPlayer() {
        playerImg.classList.add("damaged")
        setTimeout(() => {
            playerImg.classList.remove("damaged")
        }, 1000)
    }

    function healedEnemy() {
        enemyImg.classList.add("healed")
        setTimeout(() => {
            enemyImg.classList.remove("healed")
        }, 1000)
    }

    function healedPlayer() {
        playerImg.classList.add("healed")
        setTimeout(() => {
            playerImg.classList.remove("healed")
        }, 1000)
    }

    function buttonAbility(bool) {
        if (bool) {
            attackButton.disabled = false
            attackButton.classList.remove('disabled')
            healButton.disabled = false
            healButton.classList.remove('disabled')
            shieldButton.disabled = false
            shieldButton.classList.remove('disabled')
            superButton.disabled = false
            superButton.classList.remove('disabled')
        }

        else {
            attackButton.disabled = true
            attackButton.classList.add('disabled')
            healButton.disabled = true
            healButton.classList.add('disabled')
            shieldButton.disabled = true
            shieldButton.classList.add('disabled')
            superButton.disabled = true
            superButton.classList.add('disabled')
        }
    }

    function enemyTurn() {
        if (e1.health <= 0) {
            buttonAbility(false)
            setTimeout(() => {
                let coins = 50
                let bonusCoins = Math.floor(runda / 10) * 25

                if (runda % 5 == 0) {
                    bonusCoins += (runda / 5) * 100
                }

                player.coins += coins + bonusCoins

                database.collection("Korisnici").doc(player.docId).update({
                    coins: player.coins
                })

                updateCoins()

                runda++

                let enemyName = document.getElementById("enemyName")

                if (runda % 5 == 0) {
                    e1 = new Enemy((50 + (runda - 1) * 10) * 2, (10 + (runda - 1) * 10) + 50, Math.floor((10 + (runda - 1) * 5) * 3 / 2))
                    enemyName.innerHTML = `<b>BOSS</b>`
                }

                else {
                    e1 = new Enemy(50 + (runda - 1) * 10, 10 + (runda - 1) * 10, 10 + (runda - 1) * 5)
                    enemyName.innerHTML = `<b>ENEMY</b>`
                }

                e1.update()
                counter.innerText = runda
                M.toast({ html: `Wave ${runda - 1} completed!\n+${coins + bonusCoins} coins` })

                buttonAbility(true)
                return
            }, 1000)
        }

        else if (e1.health > 0 && p1.health > 0) {
            buttonAbility(false)

            let move = 1

            if ((e1.health + e1.healIncrease <= e1.maxHealth) && (p1.health - e1.damage > 0) && (e1.health + e1.healIncrease > player.damage)) {
                move = Math.floor(Math.random() * 2)
            }

            if (move) {
                if (p1.activeShield)
                    p1.shield(e1)

                setTimeout(() => {
                    damagedPlayer()
                }, 3000)

                setTimeout(() => {
                    e1.attack(p1)
                    buttonAbility(true)
                }, 4000)
            }

            else {
                setTimeout(() => {
                    healedEnemy()
                }, 3000)

                setTimeout(() => {
                    e1.heal()
                    e1.update()
                    buttonAbility(true)
                }, 4000)
            }
        }

        setTimeout(() => {
            if (p1.health <= 0) {
                buttonAbility(false)
                alert(`Game Over\nScore: ${runda - 1}`)
                setupShop()
                lostGame()
                if (runda > player.score) {
                    player.score = runda - 1

                    database.collection("Korisnici").doc(player.docId).update({
                        score: player.score
                    }).then(() => {
                        getPlayers()
                    })
                }
            }
        }, 4010)

        if (healCooldown > 0)
            healCooldown -= 1
    }

    function increaseShield() {
        if (p1.shieldPercent < p1.shieldCharge) {
            p1.shieldPercent += 1
            shieldButton.innerText = `S ${Math.round((p1.shieldPercent / p1.shieldCharge) * 100)}%`
        } 
    }

    attackButton.addEventListener("click", () => {
        p1.attack(e1)
        if (p1.attackCount < p1.superCharge) {
            p1.attackCount += 1
            superButton.innerText = `U ${Math.round((p1.attackCount / p1.superCharge) * 100)}%`
        }
        damagedEnemy()
        enemyTurn()
        increaseShield()
    })

    let healCooldown = 0
    healButton.addEventListener("click", () => {
        if (healCooldown != 0) {
            M.toast({ html: `Heal is on cooldown for ${healCooldown} round(s)!` })
            return
        }

        p1.heal()
        healCooldown = 3
        p1.update()
        healedPlayer()
        enemyTurn()
        increaseShield()
    })

    shieldButton.addEventListener("click", () => {
        if (p1.shieldPercent == 0) {
            M.toast({ html: `Shield charge is 0!` })
            return
        }

        p1.activeShield = true
        enemyTurn()
        shieldButton.innerText = `S 0%`
        p1.shieldPercent = 0
        p1.activeShield = false
    })

    superButton.addEventListener("click", () => {
        if (p1.superAttack(e1)) {
            damagedEnemy()
            enemyTurn()
            increaseShield()
        }
        else
            return
    })
}