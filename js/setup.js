M.AutoInit()

function postaviIgru() {
    hideShop()
    let okvir = document.getElementById("game")

    okvir.innerHTML = `        
    <div class="container">
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
            <p class="center" id="indicator">Super charged: 0%</p>

            <div class="row center" id="botuni">
                <button class="btn waves-effect waves-light grey darken-2" id="attack">A</button>
                <button class="btn waves-effect waves-light grey darken-2" id="heal">H</button>
                <button class="btn waves-effect waves-light grey darken-2" id="shield">S</button>
                <button class="btn waves-effect waves-light grey darken-2" id="superAttack">SA</button>
            </div>

            <div class="row">
                <div class="col s5">
                    <img src="media/player.jpg" class="responsive-img" id="playerImg">
                </div>

                <div class="col s5 offset-s2">
                    <img src="media/player.jpg" class="responsive-img" style="transform: scaleX(-1);" id="enemyImg">
                </div>
            </div>
        </div>
    </div>`

    let script = document.createElement("script")
    script.src = "js/main.js"
    document.body.appendChild(script)
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
        <div id="coinCounter" class="card col s4 m2 l2 center">
            <p><i class="material-icons">attach_money</i>${player.coins}</p>
        </div>
    </div>
    
    <div class="row">
        <div class="col s12 m6 l6 offset-m3 offset-l3">
            <div class="card">
                <div class="card-content center">
                    <h6 class="center"><b>HEALTH</b></h6>
                        <p><b>Description:</b><br>Količina healtha koju igrač ima na početku runde i koju ne može prijeći.</p>
                        <p><b>Amount:</b><br>${player.health}</p>
                        <p><b>Cost:</b><br>${(player.health) * 10}</p>
                </div>
                <a class="waves-effect waves-light btn col s12"><i class="material-icons left">arrow_upward</i>upgrade</a>
            </div>
        </div>
    </div>

    <hr>

    <div class="row">
        <div class="col s12 m6 l6 offset-m3 offset-l3">
            <div class="card">
                <div class="card-content center">
                    <h6 class="center"><b>ATTACK</b></h6>
                        <p><b>Description:</b><br>Napadni neprijatelja.</p>
                        <p><b>Damage:</b><br>${player.damage}</p>
                        <p><b>Cost:</b><br>${(player.damage) * 10}</p>
                </div>
                <a class="waves-effect waves-light btn col s12"><i class="material-icons left">arrow_upward</i>upgrade</a>
            </div>
        </div>

        <div class="col s12 m6 l6 offset-m3 offset-l3">
            <div class="card">
                <div class="card-content center" id="shieldCard">
                    <h6 class="center"><b>SHIELD</b></h6>
                        <p><b>Description:</b><br>Štiti od neprijateljske štete tijekom jedne runde.</p>
                        <p><b>Level:</b><br>${player.shield * 10} (max 10)</p>
                        <p><b>Shield percent:</b><br>${player.shield * 100}%</p>
                        <p><b>Cost:</b><br>${(player.shield) * 10000}</p>
                </div>
                <a class="waves-effect waves-light btn col s12" id="shieldUpgradeButton"><i class="material-icons left" >arrow_upward</i>upgrade</a>
            </div>
        </div>

        <div class="col s12 m6 l6 offset-m3 offset-l3">
            <div class="card">
                <div class="card-content center">
                    <h6 class="center"><b>HEAL</b></h6>
                        <p><b>Description:</b><br>Povećaj si health.</p>
                        <p><b>Level:</b><br>${player.heal / 10}</p>
                        <p><b>Heal:</b><br>${player.heal}</p>
                        <p><b>Cost:</b><br> ${(player.heal) * 10}</p>
                </div>
                <a class="waves-effect waves-light btn col s12"><i class="material-icons left">arrow_upward</i>upgrade</a>
            </div>
        </div>

        <div class="col s12 m6 l6 offset-m3 offset-l3">
            <div class="card">
                <div class="card-content center">
                    <h6 class="center"><b>SUPER ATTACK</b></h6>
                        <p><b>Description:</b><br>Napravi višestruko veći damage odjednom. Puni se nakon 3 napada. </p>
                        <p><b>Level:</b><br>${player.super}</p>
                        <p><b>Attack multiplier:</b><br>${player.super}</p>
                        <p><b>Cost:</b><br>${player.super * 100}</p>
                </div>
                <a class="waves-effect waves-light btn col s12"><i class="material-icons left">arrow_upward</i>upgrade</a>
            </div>
        </div>
    </div>`

    if (player.shield == 1) {
        let botun = document.getElementById("shieldUpgradeButton")
        botun.classList.add("disabled")

        let kartica = document.getElementById("shieldCard")
        kartica.innerHTML = `                    
        <h6 class="center"><b>SHIELD</b></h6>
            <p><b>Description:</b><br>Štiti od neprijateljske štete tijekom jedne runde.</p>
            <p><b>Level:</b><br> 10 (MAX)</p>
            <p><b>Shield percent:</b><br>${player.shield * 100}% </p>`
    }
    
    //omogucava scrollanje
    document.getElementById("body").removeAttribute("style")
}

function hideShop() {
    let shop = document.getElementById("upgrades")
    shop.innerHTML = `
    <h5>Igra je pokrenuta!</h5>
    <p>Ne možete unaprijediti moći dok je aktivna igra!</p>
    `
}