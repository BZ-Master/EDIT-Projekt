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
    shield: 0.1,
    heal: 10,
    super: 2,
    score: 0,
    docId: ""
}

let okvir = document.getElementById("game")

document.getElementById("login").addEventListener("click", () => {
    let name = document.getElementById("username").value
    let pass = document.getElementById("password").value

    let prijava = false

    database.collection("Korisnici").where("username", "==", name).where("password", "==", pass).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            prijava = true
            player.health = doc.data().healthLevel * 100
            player.coins = doc.data().coins
            player.damage = doc.data().damageLevel * 10
            player.shield = doc.data().shieldLevel * 0.1
            player.heal = doc.data().healLevel * 10
            player.super = doc.data().superLevel
            player.score = doc.data().score
            player.docId = doc.id
        })

        if (prijava) {
            alert("Uspjesna prijava")
            okvir.innerHTML = `
                <br>
                <div class="row center">
                    <a class="waves-effect waves-light btn grey darken-2" onclick=postaviIgru()>Pokreni igru</a>
                </div>
                <p class="center red-text">Unaprijedite moći prije igre jer tijekom nje nećete moći to učiniti!</p>`
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
        }

        else {
            alert("Korisnik s tim imenom već postoji!")
        }
    }))
})
