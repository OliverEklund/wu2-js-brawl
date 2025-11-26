const playerName = "Olle"
let playerHp = 100
let enemyHp = 50

const playButton = document.querySelector("#play-button")

function rollDice() {
    return Math.ceil(Math.random() * 20)
}

const playerHpElement = document.querySelector("#player-hp")
const enemyHpElement = document.querySelector("#enemy-hp")
const enemyNameElement = document.querySelector("#enemy-name")

class Enemy {
    constructor(name, hp, money){
    this.name = name
    this.hp = hp
    this.money = money}
}

function spawnEnemy() {
    const enemychoices = [
       new Enemy("Vätte", 30, 0),
       new Enemy("Gnoll", 50, 0),
       new Enemy("Orc", 80, 0),
       new Enemy("Troll", 400, 0),
       new Enemy("Skelett", 60, 0),
       new Enemy("Skelett Riddare", 100, 0),
       new Enemy("Nekromant", 200, 0),
       new Enemy("Zombie", 40, 0),
       new Enemy("Vampyr", 300, 0),
       new Enemy("Stor Råtta", 10, 0),
       new Enemy("Rått-person", 45, 0),
       new Enemy("Rått-kungen", 600, 0),
       new Enemy("Lindorm", 200, 0),
       new Enemy("Drake", 1000, 0)
    ]
    return enemychoices[Math.floor(Math.random() * enemychoices.length)]
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

let round
let enemy = spawnEnemy()

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
        enemy.hp -= damage
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

    if (playerHp < 1) {
            playButton.disabled = true
            log("Du Förlorade!")
    }
        if (enemy.hp < 1) {
            log("Du vann!")
        const heal = Math.floor(Math.random() * 45 + 10)
        log(`Du återhämtar dig och får tillbaka ${heal} hp!`, "player")
        playerHp += heal
        enemy = spawnEnemy()
        log(`När du fortsätter djupare in i labyrinten så dyker en ${enemy.name} upp!`, "enemy")
    }


    playerHpElement.textContent = playerHp < 1 ? 0 : playerHp
    enemyHpElement.textContent = enemy.hp < 1 ? 0 : enemy.hp
    enemyNameElement.textContent = enemy.name < 1 ? 0 : enemy.name
}

function gameLoop(timestamp) {
    console.log(timestamp, last)
    if (timestamp >= last + 1000) {
        gameRound()
        last = timestamp
    }

    round = window.requestAnimationFrame(gameloop)
}

const combatLogElement = document.querySelector("#combat-log")

playButton.addEventListener("click", gameRound)
