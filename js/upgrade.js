M.AutoInit()

function updateCoins() {
    document.getElementById("coinCounter").innerHTML = `<p><i class="material-icons">attach_money</i>${player.coins}</p>`
}

function upgradeAttack() {
    let price = player.damage * 10
    if (player.coins >= price) {
        let povrdaKupnje = confirm(`Želite li kupiti ATTACK LEVEL ${Math.floor(player.damage / 10) + 1}?\nTo će koštati ${price} novčića!`)

        if (povrdaKupnje) {
            database.collection("Korisnici").doc(player.docId).update({
                damageLevel: Math.floor(player.damage / 10) + 1,
                coins: player.coins - price
            })

            player.coins -= price
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
    let price = player.health * 5
    if (player.coins >= price) {
        let povrdaKupnje = confirm(`Želite li kupiti HEALTH LEVEL ${Math.floor(player.health / 50) + 1}?\nTo će koštati ${price} novčića!`)

        if (povrdaKupnje) {
            database.collection("Korisnici").doc(player.docId).update({
                healthLevel: Math.floor(player.health / 50) + 1,
                coins: player.coins - price
            })

            player.coins -= price
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
    let price = (6 - player.shield) * 2000
    if (player.coins >= price) {
        let povrdaKupnje = confirm(`Želite li kupiti SHIELD LEVEL ${6 - player.shield + 1}?\nTo će koštati ${price} novčića!`)

        if (povrdaKupnje) {
            database.collection("Korisnici").doc(player.docId).update({
                shieldLevel: 6 - player.shield + 1,
                coins: player.coins - price
            })

            player.coins -= price
            player.shield -= 1
            updateCoins()

            setupShop()

            alert(`Ability SHIELD sada je level ${6 - player.shield}!`)
        }
    }

    else {
        alert("Nedovoljno novčića!")
    }
}

function upgradeSuper() {
    let price = (7 - player.super) * 2500
    if (player.coins >= price) {
        let povrdaKupnje = confirm(`Želite li kupiti SUPER LEVEL ${7 - player.super + 1}?\nTo će koštati ${price} novčića!`)

        if (povrdaKupnje) {
            database.collection("Korisnici").doc(player.docId).update({
                superLevel: 7 - player.super + 1,
                coins: player.coins - price
            })

            player.coins -= price
            player.super -= 1
            console.log(player.super)
            updateCoins()

            setupShop()

            alert(`Ability SUPER sada je level ${7 - player.super}!`)
        }
    }

    else {
        alert("Nedovoljno novčića!")
    }
}

function upgradeHeal() {
    let price = player.heal * 20
    if (player.coins >= price) {
        let povrdaKupnje = confirm(`Želite li kupiti HEAL LEVEL ${Math.floor(player.heal/10) + 1}?\nTo će koštati ${price} novčića!`)

        if (povrdaKupnje) {
            database.collection("Korisnici").doc(player.docId).update({
                healLevel: Math.floor(player.heal / 10) + 1,
                coins: player.coins - price
            })

            player.coins -= price
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