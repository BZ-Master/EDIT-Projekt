M.AutoInit()

class Entity{
    constructor(health, damage) {
        this.health = health
        this.damage = damage
    }

    attack(p2) {
        p2.health -= this.damage
        p2.update()
    }
}

class Enemy extends Entity{
    constructor(health, damage) {
        super(health, damage)
        this.update()
    }

    update() {
        let healthBar = document.getElementById("enemyHealth")
        healthBar.value = this.health
    }
}

class Player extends Entity{
    constructor(health, damage) {
        super(health, damage)
        this.update()
    }

    update() {
        let healthBar = document.getElementById("playerHealth")
        healthBar.value = this.health
    }

    heal() {
        this.health += 10
        this.update()
    }

}

let p1 = new Player(90, 20)
let e1 = new Enemy(50, 30)

e1.attack(p1)
// p1.heal()