M.AutoInit()

function postaviIgru() {
    let okvir = document.getElementById("okvir")

    okvir.innerHTML = `        
    <div class="container">
            <div class="row">
                <div class="col s4 m3 l3 grey" id="playerCard">
                    <h5 class="center-align col s12 indigo-text"><b>YOU</b></h5>
                    <progress value="0" max="100" id="playerHealth" class="col s12"></progress>
                    <i><b>
                            <p class="center-align" id="playerDmg">Damage: </p>
                        </b></i>
                </div>

                <div class="col s2 m4 l4 offset-m1 offset-s1 offset-l1" id="counter">
                    <h5 class="center-align">Wave</h5>
                    <h4 id="runda" class="center-align"></h4>
                </div>

                <div class="col s4 m3 l3 grey offset-m1 offset-s1 offset-l1" id="enemyCard">
                    <h5 class="center-align col s12 red-text" id="enemyName"><b>ENEMY</b></h5>
                    <progress value="0" max="100" id="enemyHealth" class="col s12"></progress>
                    <i><b>
                            <p class="center-align" id="enemyDmg">Damage: </p>
                        </b></i>
                </div>
                <p class="center-align" id="indicator">Super charged: 0%</p>

                <div class="row center-align" id="botuni">
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
