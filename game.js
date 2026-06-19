/*start van de game*/

let playerChoice = 0
let computerChoice = 0

/*HP*/

let playerHp = 5000
let computerHp = 5000

/*Bluff*/

let doubleDamage = false
let shieldActive = false


/*ophalen knoppen + result screens*/

const rockBtn = document.getElementById("rockBtn")
const paperBtn = document.getElementById("paperBtn")
const scissorBtn = document.getElementById("scissorBtn") 

/*Bluff knoppen*/

const damage2xBtn = document.getElementById("damage2xBtn")
const shieldBtn = document.getElementById("shieldBtn")

const playerBox = document.getElementById("playerChoice")
const computerBox = document.getElementById("computerChoice")

/*HP bars*/

const playerHpFill = document.getElementById("playerHpFill")
const computerHpFill = document.getElementById("computerHpFill")

const playerHpText = document.getElementById("playerHpText")
const computerHpText = document.getElementById("computerHpText")

/*klik functies*/

rockBtn.addEventListener("click", () => handleChoice("rock"))
paperBtn.addEventListener("click", () => handleChoice("paper"))
scissorBtn.addEventListener("click", () => handleChoice("scissors"))

/*Bluff events*/

damage2xBtn.addEventListener("click", () => {
    doubleDamage = !doubleDamage
    damage2xBtn.classList.toggle("active")
})

shieldBtn.addEventListener("click", () => {
    shieldActive = !shieldActive
    shieldBtn.classList.toggle("active")
})

/*highlighten van de knoppen*/

function resetHighlights() {
    rockBtn.classList.remove("active")
    paperBtn.classList.remove("active")
    scissorBtn.classList.remove("active")
}

/*deselect + opslaan keuze*/

function handleChoice(choice) {
    if (playerChoice === choice) {
        playerChoice = 0
        resetHighlights()
        return
    }

    playerChoice = choice
    resetHighlights()

    if (choice === "rock") rockBtn.classList.add("active")
    if (choice === "paper") paperBtn.classList.add("active")
    if (choice === "scissors") scissorBtn.classList.add("active")
}

/*shoot*/

const shootBtn = document.getElementById("shootBtn")

shootBtn.addEventListener("click", () => {
    if (playerChoice === 0) return

    generateComputerChoice()
    showChoices()

let damage = calculateDamage()

if (doubleDamage) {
    damage *= 2
}

if (playerChoice === computerChoice) {
    // gelijkspel → geen damage
} else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
) {
    // speler wint → computer krijgt damage
    computerHp -= damage
} else {
    // speler verliest → speler krijgt damage
    if (shieldActive) {
        damage = Math.floor(damage / 2)
    }
    playerHp -= damage
}

    if (playerHp < 0) playerHp = 0
    if (computerHp < 0) computerHp = 0

    updateHpBars()
    checkGameOver()
    
    doubleDamage = false
shieldActive = false

damage2xBtn.classList.remove("active")
shieldBtn.classList.remove("active")

})

/*afbeeldingen*/

function generateComputerChoice() {
    const options = ["rock", "paper", "scissors"]
    const randomIndex = Math.floor(Math.random() * 3)
    computerChoice = options[randomIndex]
}

function showChoices() {
    playerBox.style.backgroundImage = `url('img/${playerChoice}.jpg')`
    computerBox.style.backgroundImage = `url('img/${computerChoice}.jpg')`
}

/*Damage calc*/

function calculateDamage() {
    const random = Math.random()

    if (random < 0.60) return Math.floor(Math.random() * 100) + 1
    if (random < 0.90) return Math.floor(Math.random() * 200) + 100
    return Math.floor(Math.random() * 200) + 300
}

/*HP bar update*/

function updateHpBars() {
    playerHpFill.style.width = `${(playerHp / 5000) * 100}%`
    computerHpFill.style.width = `${(computerHp / 5000) * 100}%`

    playerHpText.textContent = `${playerHp} / 5000`
    computerHpText.textContent = `${computerHp} / 5000`
}

/*game over check*/
function checkGameOver() {
    if (playerHp <= 0) {
        alert("Je hebt verloren!")
    }
    if (computerHp <= 0) {
        alert("Je hebt gewonnen!")
    }
}
