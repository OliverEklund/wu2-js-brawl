const playerName = "Olle"
let playerHp = 100
let enemyHp = 100

const playButton = document.querySelector("#play-button")

function rollDice() {
    return Math.ceil(Math.random() * 20)
}

const playerHpElement = document.querySelector("#player-hp")
const enemyHpElement = document.querySelector("#enemy-hp")

class Enemy {
    constructor(name, hp, money)
    this.name = hp
    this.money = money
}

function log(message, type) {
    const li = document.createElement("li")
    if (type) {3
        li.classList.add(type)
    }
    li.textContent = message
    combatLogElement.appendChild(li)
    if (combatLogElement.childNodes.length > 10) {
        combatLogElement.removeChild(combatLogElement.firstChild)
    }
}

function gameRound() {    
    const playerRoll = rollDice()
    const enemyRoll = rollDice()
    if (playerRoll > enemyRoll) {
        const damage = playerRoll - enemyRoll

        const playerattacks = [
            `Du träffar han för ${damage} skada!`,
            `Du slår han i nylet för ${damage} skada!`,
            `Du sparkar han i magen för ${damage} skada!`,
            `Du träffar han för ${damage} skada!`,
            `Du stampar på hans tår för ${damage} skada!`
        ]
        
        log(playerattacks[Math.ceil(Math.random() * playerattacks.length - 1)], "player")
        enemyHp -= damage
    } else if (enemyRoll > playerRoll) {
        const damage = enemyRoll - playerRoll

        const enemyattacks = [
            `Han träffar dig för ${damage} skada!`,
            `Han slår dig i nylet för ${damage} skada!`,
            `Han sparkar dig i magen för ${damage} skada!`,
            `Han träffar dig för ${damage} skada!`,
            `Han stampar på dina tår för ${damage} skada!`
        ]
        
        log(enemyattacks[Math.ceil(Math.random() * enemyattacks.length - 1)], "enemy")
        playerHp -= damage
    } else {
        log("Inget hände!")
    }

    if (playerHp < 1 || enemyHp < 1){
        playButton.disabled = true
    } else if (playerHp < 30) {
        playerHpElement.classList.add("hp-low")
    }

    playerHpElement.textContent = playerHp < 1 ? 0 : playerHp
    enemyHpElement.textContent = enemyHp < 1 ? 0 : enemyHp
}

function.gameloop(timestamp) {
    if (timestamp >= last + 1000) {
        gameRound()
        last = timestamp;
    }
    round = window.requestAnimationFrame(gameloop)
}

const combatLogElement = document.querySelector("#combat-log")

playButton.addEventListener("click", gameRound)