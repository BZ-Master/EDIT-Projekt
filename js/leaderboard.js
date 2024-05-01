M.AutoInit()

let players = []
let tablica = document.getElementById("ljestvica")

function showTopPlayers() {
    for (let i = 0; i < 10; i++) {
        tablica.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${players[i].username}</td>
            <td>${players[i].score}</td>
        </tr>`
    }
}

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
    showTopPlayers()
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