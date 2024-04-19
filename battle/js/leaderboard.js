M.AutoInit()


let players = []
let tablica = document.getElementById("ljestvica")

function processPlayers() {
    players.forEach(el => {
        console.log(el)
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
    }))

    console.log(players)
    processPlayers()

    // for (let i = 0; i < players.length; i++) {
    //     for (let j = i; j < players.length; j++) {
    //         if (players[i].score > players[j].score){
    //             players[i], players[j] = players[j], players[i]
    //         }
    //     }
    // }
}

getPlayers()


// players = getPlayers(players)
// players.forEach(el => {
//     tablica.innerHTML += `
//     <tr>
//         <td>${el.username}</td>
//         <td>${el.score}</td>
//     </tr>`
// })

// players.forEach(el => {
//     console.log(el)
//     // tablica.innerHTML += `
//     // <tr>
//     //     <td>${el.username}</td>
//     //     <td>${el.score}</td>
//     // </tr>` 
// })


