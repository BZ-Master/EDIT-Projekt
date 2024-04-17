M.AutoInit()

let runda = 1
let counter = document.getElementById("runda")
counter.innerText = runda

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
    }

    update() {
        let healthBar = document.getElementById("enemyHealth")
        healthBar.value = this.health
        healthBar.max = this.maxHealth
    }
}

class Player extends Entity {
    constructor(health, damage) {
        super(health, damage)
        this.attackCount = 0
        this.update()
    }

    update() {
        let healthBar = document.getElementById("playerHealth")
        healthBar.value = this.health
        healthBar.max = this.maxHealth
    }

    heal() {
        this.health += 40
        this.update()
    }

    shield(e) {
        this.health += e.damage
        setTimeout(() => {
            this.health -= Math.floor(e.damage / 2)
            this.update()
        }, 2001)
    }

    superAttack(e) {
        if (this.attackCount = 3) {
            for (let i = 0; i < 5; i++) {
                this.attack(e)
            }
            this.attackCount = 0
            return true
        }
        alert("Can't use super")
        return false
    }
}

let p1 = new Player(100, 20)
let e1 = new Enemy(100 + (runda - 1) * 10, 30 + (runda - 1) * 5)

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
        e1 = new Enemy(100 + (runda - 1) * 10, 30 + (runda - 1) * 5)
        e1.update()
        counter.innerText = runda
        alert(`Wave ${runda} completed!`)
        return
    }

    else if (e1.health > 0 && p1.health > 0) {
        buttonAbility(false)
        setTimeout(() => {
            e1.attack(p1)
            buttonAbility(true)
        }, 2000)
    }

    if (p1.health <= 0) {
        buttonAbility(false)
    }
}

attackButton.addEventListener("click", () => {
    p1.attack(e1)
    p1.attackCount += 1
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