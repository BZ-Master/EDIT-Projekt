M.AutoInit()

const firebaseConfig = {
    apiKey: "AIzaSyDLdeyT4BrVdZG4jfxFAGJGirHnIULM5do",
    authDomain: "edit-projekt-bf73d.firebaseapp.com",
    projectId: "edit-projekt-bf73d",
    storageBucket: "edit-projekt-bf73d.appspot.com",
    messagingSenderId: "45463981132",
    appId: "1:45463981132:web:bb4e9e26488803c68ff8e9"
};

const app = firebase.initializeApp(firebaseConfig);
let database = app.firestore()

let player = {
    coins: 0,
    damage: 10,
    shield: 0.1,
    heal: 10,
    super: 2
}

let okvir = document.getElementById("game")

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
                    <h6 class="center"><b>ATTACK</b></h6>
                        <p><b>Description:</b><br>Napadni neprijatelja. </p>
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
                        <p><b>Shield percent:</b><br>${player.shield*100}%</p>
                        <p><b>Cost:</b><br>${(player.shield) * 100}</p>
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
}

document.getElementById("login").addEventListener("click", () => {
    let name = document.getElementById("username").value
    let pass = document.getElementById("password").value

    let prijava = false

    database.collection("Korisnici").where("username", "==", name).where("password", "==", pass).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            prijava = true
            player.coins = doc.data().coins
            player.damage = doc.data().damageLevel * 10
            player.shield = doc.data().shieldLevel * 0.1
            player.heal = doc.data().healLevel * 10
            player.super = doc.data().superLevel
        })

        if (prijava) {
            alert("Uspjesna prijava")
            okvir.innerHTML = `
                <br>
                <div class="row center">
                    <a class="waves-effect waves-light btn grey darken-2" onclick=postaviIgru()>Pokreni igru</a>
                </div>`
            setupShop()
        }

        else {
            alert("Pogresno ime ili lozinka!")
        }
    })
})

document.getElementById("register").addEventListener("click", () => {
    let name = document.getElementById("username").value
    let pass = document.getElementById("password").value

    let korisnici = database.collection("Korisnici")

    let novi = true

    korisnici.where("username", "==", name).get().then((querySnapshot => {
        querySnapshot.forEach(doc => {
            if (doc.data().username == name) {
                novi = false
            }
        })

        if (novi) {
            korisnici.add({
                username: name,
                password: pass,
                score: 0,
                coins: 0,
                damageLevel: 1,
                shieldLevel: 1,
                healLevel: 1,
                superLevel: 1
            })

            alert(`Uspješna registracija! Dobro došli ${name}!`)
            setupShop()
        }

        else {
            alert("Korisnik s tim imenom već postoji!")
        }
    }))
})
