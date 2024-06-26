M.AutoInit()

function postaviIgru() {
    hideShop()
    let okvir = document.getElementById("game")

    okvir.innerHTML = `
    <a class="waves-effect waves-light btn grey darken-2" onclick = quitGame()><i class="material-icons left">close</i>Završi igru</a>
    <div class="container">
        <br>
        <div class="row">
            <div class="col s4 m3 l3 grey" id="playerCard">
                <h5 class="center indigo-text"><b>YOU</b></h5>
                <progress value="0" max="100" id="playerHealth" class="col s12"></progress>
                <i><b>
                    <p class="center" id="playerDmg">Damage: </p>
                </b></i>
            </div>

            <div class="col s2 m4 l4 offset-m1 offset-s1 offset-l1" id="counter">
                <h6 class="center">Wave</h6>
                <h4 id="runda" class="center"></h4>
            </div>

            <div class="col s4 m3 l3 grey offset-m1 offset-s1 offset-l1" id="enemyCard">
                <h5 class="center red-text" id="enemyName"><b>ENEMY</b></h5>
                <progress value="0" max="100" id="enemyHealth" class="col s12"></progress>
                <i><b>
                    <p class="center" id="enemyDmg">Damage: </p>
                </b></i>
            </div>
        </div>

        <div class="row center" id="botuni">
            <button class="btn waves-effect waves-light grey darken-2" id="attack">A</button>
            <button class="btn waves-effect waves-light grey darken-2" id="heal">H</button>
            <button class="btn waves-effect waves-light grey darken-2" id="shield">S 0%</button>
            <button class="btn waves-effect waves-light grey darken-2" id="superAttack">U 0%</button>
        </div>

        <div class="row">
            <div class="col s5">
                <img src="media/player.jpg" class="responsive-img" id="playerImg">
            </div>

            <div class="col s5 offset-s2">
                <img src="media/enemy.jpg" class="responsive-img" id="enemyImg">
            </div>
        </div>
    </div>`

    game()
}

function lostGame() {
    let okvir = document.getElementById("game")

    okvir.innerHTML = `
        <br>
        <div class="row center">
            <a class="waves-effect waves-light btn grey darken-2" onclick=postaviIgru()>Pokreni igru</a>
        </div>
        <p class="center red-text">Unaprijedite moći prije igre jer tijekom nje nećete moći to učiniti!</p>`
}

function setupShop() {
    let shop = document.getElementById("upgrades")

    shop.innerHTML = `
    <h3 class="center">Upgrades</h3>
    
    <div class="row">
        <div class="col s12 m6 l6 offset-m3 offset-l3">
            <div class="card">
                <div class="card-content center">
                    <h6 class="center"><b>HEALTH</b></h6>
                    <p><b>Description:</b><br>Količina healtha koju igrač ima na početku runde i koju ne može prijeći.</p>
                    <p><b>Level:</b><br> ${Math.floor(player.health / 50)}
                    <p><b>Amount:</b><br> ${player.health}</p>
                    <p><b>Cost:</b><br> ${(Math.ceil((player.health / 5) ** 1.5 / 80)) * 150}</p>
                </div>
                <a class="waves-effect waves-light btn col s12 green" onclick=upgradeHealth()><i class="material-icons left">arrow_upward</i>upgrade</a>
            </div>
        </div>
    </div>

    <br>
    <hr>

    <h4 class="center">Abilities</h4>

    <div class="row">
        <div class="col s12 m6 l6 offset-m3 offset-l3">
            <div class="card">
                <div class="card-content center">
                    <h6 class="center"><b>ATTACK</b></h6>
                    <p><b>Description:</b><br>Napadni neprijatelja i napravi mu štetu.</p>
                    <p><b>Level:</b><br> ${Math.floor(player.damage / 10)}</p>
                    <p><b>Damage:</b><br> ${player.damage}</p>
                    <p><b>Cost:</b><br> ${(Math.ceil((player.damage) ** 1.5 / 80)) * 100}</p>
                </div>
                <a class="waves-effect waves-light btn col s12 green" onclick=upgradeAttack()><i class="material-icons left" >arrow_upward</i>upgrade</a>
            </div>
        </div>

        <div class="col s12 m6 l6 offset-m3 offset-l3">
            <div class="card">
                <div class="card-content center">
                    <h6 class="center"><b>HEAL</b></h6>
                    <p><b>Description:</b><br>Povećaj si health za ${player.heal}.</p>
                    <p><b>Level:</b><br> ${Math.floor(player.heal / 10)}</p>
                    <p><b>Heal:</b><br> ${player.heal}</p>
                    <p><b>Cost:</b><br> ${(Math.ceil((player.heal) ** 1.5 / 80)) * 80}</p>
                </div>
                <a class="waves-effect waves-light btn col s12 green" onclick=upgradeHeal()><i class="material-icons left">arrow_upward</i>upgrade</a>
            </div>
        </div>

        <div class="col s12 m6 l6 offset-m3 offset-l3">
            <div class="card">
                <div class="card-content center" id="shieldCard">
                    <h6 class="center"><b>SHIELD</b></h6>
                    <p><b>Description:</b><br>Štiti od određenog postotka neprijateljske štete. Upgrade ubrzava punjenje ovog abilityja.</p>
                    <p><b>Level:</b><br> ${6 - player.shield} (max 5)</p>
                    <p><b>Rounds to charge fully:</b><br> ${player.shield}</p>
                    <p><b>Cost:</b><br> ${2 ** (6 - player.shield + 1) * 1000}</p>
                </div>
                <a class="waves-effect waves-light btn col s12 green" id="shieldUpgradeButton" onclick=upgradeShield()><i class="material-icons left" >arrow_upward</i>upgrade</a>
            </div>
        </div>

        <div class="col s12 m6 l6 offset-m3 offset-l3">
            <div class="card">
                <div class="card-content center" id="superCard">
                    <h6 class="center"><b>SUPER ATTACK</b></h6>
                    <p><b>Description:</b><br> Napravi višestruko veći damage odjednom. Puni se nakon ${player.super} napada. Upgrade smanjuje broj potrebnih aktivacija attack abilityja za 1.</p>
                    <p><b>Level:</b><br> ${7 - player.super} (max 5)</p>
                    <p><b>Attack multiplier:</b><br> 3</p>
                    <p><b>Attacks to charge:</b><br> ${player.super}</p>
                    <p><b>Cost:</b><br> ${2 ** (7 - player.super + 1) * 1000 + (7 - player.super + 1) * 1000}</p>
                </div>
                <a class="waves-effect waves-light btn col s12 green" onclick=upgradeSuper() id="superUpgradeButton"><i class="material-icons left">arrow_upward</i>upgrade</a>
            </div>
        </div>
    </div>`

    if (player.shield == 1) {
        let botun = document.getElementById("shieldUpgradeButton")
        botun.classList.add("disabled")

        let kartica = document.getElementById("shieldCard")
        kartica.innerHTML = `                    
        <h6 class="center"><b>SHIELD</b></h6>
        <p><b>Description:</b><br>Štiti od određenog postotka neprijateljske štete. Upgrade ubrzava punjenje ovog abilityja.</p>
        <p><b>Level:</b><br>5 (MAX)</p>
        <p><b>Rounds to charge fully:</b><br>1</p>`
    }

    if (player.super == 2) {
        let botun = document.getElementById("superUpgradeButton")
        botun.classList.add("disabled")

        let kartica = document.getElementById("superCard")
        kartica.innerHTML = `                    
        <h6 class="center"><b>SHIELD</b></h6>
        <h6 class="center"><b>SUPER ATTACK</b></h6>
        <p><b>Description:</b><br>Napravi višestruko veći damage odjednom. Puni se nakon ${player.super} napada. Upgrade smanjuje broj potrebnih aktivacija attack abilityja za 1.</p>
        <p><b>Level:</b><br>${7 - player.super} (MAX)</p>
        <p><b>Attack multiplier:</b><br>3</p>
        <p><b>Attacks to charge:</b><br>${player.super}</p>`
    }

    //omogucava scrollanje nakon izvrsenja funkcije
    document.getElementById("body").removeAttribute("style")
}

function hideShop() {
    let shop = document.getElementById("upgrades")
    shop.innerHTML = `
    <h5 class="center">Igra je pokrenuta!</h5>
    <p class="center">Ne možete unaprijediti moći dok je aktivna igra!</p>
    `
}

function quitGame() {
    let potvdra = confirm("Želite li prekinuti trenutnu igru?\nVaš rezultat se neće zabilježiti!")

    if (potvdra) {
        lostGame()
        setupShop()
    }
}