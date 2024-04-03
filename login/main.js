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

document.getElementById("login").addEventListener("click", () => {
    let name = document.getElementById("username").value
    let pass = document.getElementById("password").value

    let prijava = false

    database.collection("Korisnici").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            podaci = doc.data()
            console.log(podaci)

            if (podaci.Ime == name && pass == podaci.Lozinka) {
                prijava = true
            }
        });

        if (prijava) {
            alert("Uspjesna prijava")
        }

        else {
            alert("Pogresno ime ili lozinka")
        }
    });
})