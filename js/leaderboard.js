M.AutoInit()

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
            <td>${el.username}</td>
            <td>${el.score}</td>
        </tr>`
    })
}

function getPlayers() {
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