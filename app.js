const allActions = document.querySelector(".actions").querySelectorAll("img")
const message = document.querySelector(".container > h4")

const playerScore = document.getElementById("you").querySelector("p")
const goal = document.getElementById("goal").querySelector("p")
const computerScore = document.getElementById("computer").querySelector("p")

const result = document.querySelector(".result")
const hands = result.querySelectorAll("img")
const leftHand = hands[0]
const rightHand = hands[1]
const actions = document.querySelector(".actions")
const tryAgainContainer = document.querySelector(".try_again")
const resultMessage = document.querySelector(".result_message")

let playerScoreValue = 0
let computerScoreValue = 0
let goalValue = 3
let gameFinished = false

const choicesHandler = event => {
    message.style.display = "none"
    actions.style.display = "none"
    result.style.display = "flex"
    const playerAction = event.target.alt
    const computerAction = Math.floor(Math.random() * 3)
    switch(computerAction) {
        case 0:
            handAnimation(playerAction, "rock")
            break
        case 1:
            handAnimation(playerAction, "papper")
            break
        case 2:
            handAnimation(playerAction, "scissors")
            break
    }
}

const handAnimation = (playerAction, computerAction) => {
    leftHand.src = `./images/rock_player.png`
    rightHand.src = `./images/rock_pc.png`
    leftHand.style.animation = "fadeInLeft 1s ease-in-out"
    rightHand.style.animation = "fadeInRight 1s ease-in-out"
    
    setTimeout(() => {
        leftHand.src = `./images/${playerAction}_player.png`
        rightHand.src = `./images/${computerAction}_pc.png`
        leftHand.style.animation = "none"
        rightHand.style.animation = "none"
        game(playerAction, computerAction)
    }, 3000);    
}

const checkWin = () => {
    if (playerScoreValue === computerScoreValue && playerScoreValue + 1 === goalValue) {
        goalValue++
        goal.className = "animate__animated animate__backInDown"
        goal.innerText = goalValue
    } 
    else if (playerScoreValue === goalValue) {
        tryAgainContainer.style.display = "flex"
        resultMessage.style.display = "block"
        resultMessage.innerText = "YOU WIN!🎉"
        resultMessage.classList.add("animate__animated", "animate__shakeY")
        return gameFinished = true
    } else if (computerScoreValue === goalValue) {
        tryAgainContainer.style.display = "flex"
        resultMessage.style.display = "block"
        resultMessage.innerText = "YOU LOSE!😭"
        resultMessage.classList.add("animate__animated", "animate__shakeY")
        return gameFinished = true
    }

}

const calcScores = winner => {
    switch (winner) {
        case "player":
            playerScoreValue++
            playerScore.className = "animate__animated animate__backInDown"
            playerScore.innerText = playerScoreValue
            if (checkWin())
                return
            break
        case "computer":
            computerScoreValue++
            computerScore.className = "animate__animated animate__bounceInDown"
            computerScore.innerText = computerScoreValue
            if(checkWin())
                return
    }
    setTimeout(() => {
        message.style.display = "block"
        actions.style.display = "flex"
        result.style.display = "none"
        playerScore.className = ""
        computerScore.className = ""
        goal.className = ""
    }, 2000);
}

const tryAgainHandler = () => {
    playerScoreValue = 0
    computerScoreValue = 0
    goalValue = 3
    playerScore.innerText = playerScoreValue
    computerScore.innerText = computerScoreValue
    goal.innerText = goalValue
    message.style.display = "block"
    actions.style.display = "flex"
    result.style.display = "none"
    tryAgainContainer.style.display = "none"
    resultMessage.classList.remove("animate__animated", "animate__shakeY")
    resultMessage.style.display = "none"
    gameFinished = false
}

const game = (playerAction, computerAction) => {
    if (playerAction === computerAction) 
        calcScores("draw")
    else if (playerAction === "rock")
        calcScores(computerAction === "scissors" ? "player" : "computer") // ternary operator
    else if (playerAction === "papper")
        calcScores(computerAction === "rock" ? "player" : "computer" )
    else
        calcScores(computerAction === "papper" ? "player" : "computer")
}

allActions.forEach(action => action.addEventListener("click", choicesHandler))
leftHand.addEventListener("animationend", () => leftHand.style.animation = "shake-hands 1.5s ease-in-out infinite alternate")
rightHand.addEventListener("animationend", () => rightHand.style.animation = "shake-hands 1.5s ease-in-out infinite alternate")
tryAgainContainer.addEventListener("click", tryAgainHandler)