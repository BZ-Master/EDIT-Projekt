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


let okvir = document.getElementById("okvir")

document.getElementById("login").addEventListener("click", () => {
    let name = document.getElementById("username").value
    let pass = document.getElementById("password").value

    let prijava = false

    database.collection("Korisnici").where("username", "==", name).where("password", "==", pass).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            prijava = true
        })

        if (prijava) {
            alert("Uspjesna prijava")
            okvir.innerHTML = `
                <br>
                <div class="row center">
                    <a class="waves-effect waves-light btn grey darken-2" onclick=postaviIgru()>Pokreni igru</a>
                </div>`
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
                score: 0
            })
            alert(`Uspješna registracija! Dobro došli ${name}!`)
        }

        else {
            alert("Korisnik s tim imenom već postoji!")
        }
    }))
})
