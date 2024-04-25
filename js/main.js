M.AutoInit()

let runda = 1
let counter = document.getElementById("runda")
counter.innerText = runda

let superChargeIndicator = document.getElementById("indicator")

class Entity {
    constructor(health, damage) {
        this.health = health
        this.damage = damage
        this.maxHealth = health
    }

    attack(p2) {
        p2.health -= this.damage
        p2.update()
    }
}

class Enemy extends Entity {
    constructor(health, damage) {
        super(health, damage)
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
    constructor(health, damage, shield, heal) {
        super(health, damage)
        this.shieldPercent = shield
        this.healIncrease = heal
        this.superAttackMultiplier = 3
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

    heal() {
        this.health += this.healIncrease
        this.update()
    }

    shield(e) {
        this.health += e.damage
        setTimeout(() => {
            this.health -= Math.floor(e.damage * (1 - this.shieldPercent))
        }, 2001)
    }

    superAttack(e) {
        if (this.attackCount == 3) {
            for (let i = 0; i < this.superAttackMultiplier; i++) {
                this.attack(e)
            }
            this.attackCount = 0
            superChargeIndicator.innerText = `Super charged: 0%`
            return true
        }
        alert("Can't use super")
        return false
    }
}

let p1 = new Player(player.health, player.damage, player.shield, player.heal)
let e1 = new Enemy(100 + (runda - 1) * 10, 10 + (runda - 1) * 5)

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

let attackButton = document.getElementById("attack")
let healButton = document.getElementById("heal")
let shieldButton = document.getElementById("shield")
let superButton = document.getElementById("superAttack")

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
        runda++
        e1 = new Enemy(100 + (runda - 1) * 10, 10 + (runda - 1) * 5)
        e1.update()
        counter.innerText = runda
        alert(`Wave ${runda - 1} completed!`)
        return
    }

    else if (e1.health > 0 && p1.health > 0) {
        buttonAbility(false)

        setTimeout(() => {
            damagedPlayer()
        }, 3000)

        setTimeout(() => {
            e1.attack(p1)
            buttonAbility(true)
        }, 4000)
    }

    setTimeout(() => {
        if (p1.health <= 0) {
            buttonAbility(false)
            alert("YOU LOST")
            setupShop()
            lostGame()
            getPlayers()
            if (runda > player.score) {
                player.score = runda - 1

                database.collection("Korisnici").doc(player.docId).update({
                    score: player.score
                })
            }
        }
    }, 4010)
}

attackButton.addEventListener("click", () => {
    p1.attack(e1)
    if (p1.attackCount < 3) {
        p1.attackCount += 1
        superChargeIndicator.innerText = `Super charged: ${Math.round((p1.attackCount / 3) * 100)}%`
    }
    damagedEnemy()
    enemyTurn()
})

healButton.addEventListener("click", () => {
    p1.heal()
    enemyTurn()
})

shieldButton.addEventListener("click", () => {
    p1.shield(e1)
    enemyTurn()
})

superButton.addEventListener("click", () => {
    if (p1.superAttack(e1))
        enemyTurn()
    else
        return
})