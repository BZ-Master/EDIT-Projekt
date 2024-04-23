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
    damage: 10
}

function setupShop() {
    let shop = document.getElementById("upgrades")

    shop.innerHTML = `
    <h3 class="center">Upgrades</h3>
    <div class="row">
        <div id="coinCounter" class="card col s4 m2 l1 center">
            <p><i class="material-icons">attach_money</i>${player.coins}</p>
        </div>
    </div>
    
    <div class="row">
        <div class="col s6 m3 l3">
            <div class="card">
                <div class="card-content">
                    <h6 class="center"><b>ATTACK</b></h6>
                        <p><i>Description:</i> Napadni neprijatelja </p>
                        <p><i>Damage:</i> ${player.damage}</p>
                        <p><i>Cijena:</i> 100</p>
                </div>
                <a class="waves-effect waves-light btn col s12"><i class="material-icons left">arrow_upward</i>upgrade</a>
            </div>
        </div>
    </div>`
}

let okvir = document.getElementById("okvir")

document.getElementById("login").addEventListener("click", () => {
    let name = document.getElementById("username").value
    let pass = document.getElementById("password").value

    let prijava = false

    database.collection("Korisnici").where("username", "==", name).where("password", "==", pass).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            prijava = true
            player.coins = doc.data().coins
            player.damage = doc.data().damageLevel*10
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
                damageLevel: 0
            })

            alert(`Uspješna registracija! Dobro došli ${name}!`)
            setupShop()
        }

        else {
            alert("Korisnik s tim imenom već postoji!")
        }
    }))
})
