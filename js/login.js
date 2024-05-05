M.AutoInit()

const firebaseConfig = {
    apiKey: "AIzaSyDLdeyT4BrVdZG4jfxFAGJGirHnIULM5do",
    authDomain: "edit-projekt-bf73d.firebaseapp.com",
    projectId: "edit-projekt-bf73d",
    storageBucket: "edit-projekt-bf73d.appspot.com",
    messagingSenderId: "45463981132",
    appId: "1:45463981132:web:bb4e9e26488803c68ff8e9"
}

const app = firebase.initializeApp(firebaseConfig);
let database = app.firestore()

let player = {
    name: "",
    health: 100,
    coins: 0,
    damage: 10,
    shield: 1,
    heal: 10,
    super: 2,
    score: 0,
    docId: ""
}

function logOut() {
    let potvdra = confirm(`Želite li se odjaviti s računa ${player.name}?`)

    if (potvdra) {
        document.getElementById("game").innerHTML = `
            <h5 class="center">Kako bi igrali igru potrebna je prijava</h5>
            <br>
            <div class="row center">
                <a class="waves-effect waves-light btn modal-trigger grey darken-2" href="#prijava">Prijava</a>
            </div>
        `

        document.getElementById("upgrades").innerHTML = `
            <h5 class="center">Unaprijedite svoje moći!</h5>
            <p class="center">Ako ne vidite svoje moći potrebna je <a href="#game">prijava</a>!</p>
        `

        document.getElementById("logOutButton").innerHTML = ``
        document.getElementById("coinCounterFrame").innerHTML = ``

        document.getElementById("logInButton").innerHTML = `
            <a class="btn-floating btn-large red" href="#game">
                <i class="large material-icons">person</i>
            </a
        `
    }
}

let okvir = document.getElementById("game")

document.getElementById("login").addEventListener("click", () => {
    let name = document.getElementById("username").value
    let pass = document.getElementById("password").value

    let prijava = false

    database.collection("Korisnici").where("username", "==", name).where("password", "==", pass).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            prijava = true
            player.health = doc.data().healthLevel * 50
            player.coins = doc.data().coins
            player.damage = doc.data().damageLevel * 10
            player.shield = 6 - doc.data().shieldLevel
            player.heal = doc.data().healLevel * 10
            player.super = 7 - doc.data().superLevel
            player.score = doc.data().score
            player.docId = doc.id
            player.name = doc.data().username
        })

        if (prijava) {
            alert("Uspjesna prijava")
            okvir.innerHTML = `
                <br>
                <div class="row center">
                    <a class="waves-effect waves-light btn grey darken-2" onclick=postaviIgru()>Pokreni igru</a>
                </div>
                <p class="center red-text">Unaprijedite moći prije igre jer tijekom nje nećete moći to učiniti!</p>`

            document.getElementById("coinCounterFrame").innerHTML = `
                <div id="coinCounter" class="card col s4 m2 l2 center">
                    <p><i class="material-icons">attach_money</i>${player.coins}</p>
                </div>`

            document.getElementById("logOutButton").innerHTML = `
                <a class="btn-floating btn-large red" onclick=logOut()>
                    <i class="large material-icons">exit_to_app</i>
                </a>
            `

            document.getElementById("logInButton").innerHTML = ``

            //zatvara modal za prijavu
            setTimeout(() => {
                let modal = document.getElementById('prijava')
                let instance = M.Modal.getInstance(modal)
                instance.close()
            }, 100)

            updateCoins()
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

    if (name.trim() == "" || pass.trim() == "") {
        alert("Username i password ne mogu biti prazni!")
        return
    }

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
                superLevel: 1,
                healthLevel: 1
            })

            alert(`Uspješna registracija! Dobro došli ${name}!`)
        }

        else {
            alert("Korisnik s tim imenom već postoji!")
        }
    }))
})
