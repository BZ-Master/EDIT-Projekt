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

function otvoriPrijavu() {
    let okvir = document.getElementById("okvir")

    okvir.innerHTML = `
    <div class="container">
        <h5 class="center">PRIJAVA</h5>
        <p class="center">Unesite korisničko ime i lozinku. Ako želite kreirati račun kliknite REGISTER!<p>
        <div class="row">
            <div class="col s12 m6 l4 offset-m3 offset-l4">
                <form>
                    <div class="row">
                        <div class="input-field col s12">
                            <input placeholder="Username" id="username" type="text" class="validate center-align">
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field col s12">
                            <input placeholder="Password" id="password" type="password" class="validate center-align">
                        </div>
                    </div>
                </form>
                <div class="row">
                    <button class="btn waves-effect waves-light grey darken-2 col s6 m4 l4 offset-m4 offset-l4 offset-s3" id="login">Login</button>
                </div>
                <div class="row">
                    <button class="btn waves-effect waves-light grey darken-2 col s6 m4 l4 offset-m4 offset-l4 offset-s3">Register</button>
                </div>
            </div>
        </div>
    </div>`

    document.getElementById("login").addEventListener("click", () => {
        let name = document.getElementById("username").value
        let pass = document.getElementById("password").value

        console.log(name, pass)

        let prijava = false

        database.collection("Korisnici").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                podaci = doc.data()
                console.log(podaci)

                if (podaci.username == name && pass == podaci.password) {
                    prijava = true
                }
            });

            if (prijava) {
                alert("Uspjesna prijava")
                okvir.innerHTML = `
                <br>
                <div class="row center">
                    <a class="waves-effect waves-light btn grey darken-2" onclick=postaviIgru()>Pokreni igru</a>
                </div>`
            }

            else {
                alert("Pogresno ime ili lozinka")
            }
        });
    })
}
