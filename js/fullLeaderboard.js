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

let players = []
let tablica = document.getElementById("ljestvica")

function processPlayers() {
    let t
    for (let i = 0; i < players.length; i++) {
        for (let j = i + 1; j < players.length; j++) {
            if (players[i].score < players[j].score) {
                t = players[i]
                players[i] = players[j]
                players[j] = t
            }
        }
    }
    
    players.forEach(el => {
        tablica.innerHTML += `
        <tr>
            <td>${players.indexOf(el) + 1}</td>
            <td>${el.username}</td>
            <td>${el.score}</td>
        </tr>`
    })
}

function getPlayers() {
    players = []
    tablica.innerHTML = ``
    database.collection("Korisnici").get().then((querySnapshot => {
        querySnapshot.forEach(doc => {
            players.push({
                username: doc.data().username,
                score: doc.data().score
            })
        })
    })).then(() => {
        processPlayers()
    })
}

getPlayers()