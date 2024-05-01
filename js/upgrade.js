M.AutoInit()

function updateCoins() {
    document.getElementById("coinCounter").innerHTML = `<p><i class="material-icons">attach_money</i>${player.coins}</p>`
}

function upgradeAttack() {
    if (player.coins >= player.damage * 10) {
        let povrdaKupnje = confirm(`Želite li kupiti ATTACK LEVEL ${Math.floor(player.damage / 10) + 1}?\nTo će koštati ${player.damage * 10} novčića!`)

        if (povrdaKupnje) {
            database.collection("Korisnici").doc(player.docId).update({
                damageLevel: Math.floor(player.damage / 10) + 1,
                coins: player.coins - player.damage * 10
            })

            player.coins -= player.damage * 10
            player.damage += 10
            updateCoins()

            setupShop()

            alert(`Ability ATTACK sada je level ${Math.floor(player.damage / 10)}!`)
        }
    }

    else {
        alert("Nedovoljno novčića!")
    }
}

function upgradeHealth() {
    if (player.coins >= player.health * 5) {
        let povrdaKupnje = confirm(`Želite li kupiti HEALTH LEVEL ${Math.floor(player.health / 50) + 1}?\nTo će koštati ${player.health * 5} novčića!`)

        if (povrdaKupnje) {
            database.collection("Korisnici").doc(player.docId).update({
                healthLevel: Math.floor(player.health / 50) + 1,
                coins: player.coins - player.health * 5
            })

            player.coins -= player.health * 5
            player.health += 50
            updateCoins()

            setupShop()

            alert(`HEALTH je sada level ${Math.floor(player.health / 50)}!`)
        }
    }

    else {
        alert("Nedovoljno novčića!")
    }
}

function upgradeShield() {
    if (player.coins >= (player.shield * 1000)) {
        let povrdaKupnje = confirm(`Želite li kupiti SHIELD LEVEL ${player.shield + 1}?\nTo će koštati ${player.shield * 1000} novčića!`)

        if (povrdaKupnje) {
            database.collection("Korisnici").doc(player.docId).update({
                shieldLevel: player.shield + 1,
                coins: player.coins - player.shield * 1000
            })

            player.coins -= (player.shield) * 1000
            player.shield += 1
            updateCoins()

            setupShop()

            alert(`Ability SHIELD sada je level ${player.shield}!`)
        }
    }

    else {
        alert("Nedovoljno novčića!")
    }
}

function upgradeSuper() {
    if (player.coins >= player.super * 200) {
        let povrdaKupnje = confirm(`Želite li kupiti SUPER LEVEL ${player.super - 1}?\nTo će koštati ${player.super * 200} novčića!`)

        if (povrdaKupnje) {
            database.collection("Korisnici").doc(player.docId).update({
                superLevel: player.super,
                coins: player.coins - player.super * 200
            })

            player.coins -= player.super * 200
            player.super += 1
            updateCoins()

            setupShop()

            alert(`Ability SUPER sada je level ${player.super - 1}!`)
        }
    }

    else {
        alert("Nedovoljno novčića!")
    }
}


function upgradeHeal() {
    if (player.coins >= player.heal * 10) {
        let povrdaKupnje = confirm(`Želite li kupiti HEAL LEVEL ${Math.floor(player.heal/10) + 1}?\nTo će koštati ${player.super * 200} novčića!`)

        if (povrdaKupnje) {
            database.collection("Korisnici").doc(player.docId).update({
                healLevel: Math.floor(player.heal / 10) + 1,
                coins: player.coins - player.heal * 10
            })

            player.coins -= player.heal * 10
            player.heal += 10
            updateCoins()

            setupShop()

            alert(`Ability HEAL sada je level ${Math.floor(player.heal / 10)}!`)
        }
    }

    else {
        alert("Nedovoljno novčića!")
    }
}