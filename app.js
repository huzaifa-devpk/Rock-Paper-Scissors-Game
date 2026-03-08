let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const resetBtn = document.querySelector("#reset-btn");

const clickSound = document.querySelector("#clickSound");

const genCompChoice = () => {                      //random string generate nhi krwa saktey isliye random No. krwaye index ki form main
    const options = ["rock","paper","scissors"];
    let randomIdx = Math.floor(Math.random()*3);   //Math.random()(0 se le kar 1 se chota random number deta hai, example: 0.25, 0.89, 0.41)_ Math.random()*3(Range ho jati hai 0 se 2.999...)_ Math.floor()(Decimal hata kar integer deta hai:- Math.floor(2.67) = 2)
    return options[randomIdx];                     //if(randomIdx = 1) then(options[1] → paper)
}

const showWinner = (userWin, userChoice, compChoice) => {
    if(userWin){          //means if(userWin === true)
        userScore++;      //updation
        userScorePara.innerText = userScore;
        msg.innerText = `You win! (${userChoice} vs ${compChoice})`;
        msg.style.backgroundColor = "green";
    } else{
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You lose! (${userChoice} vs ${compChoice})`;
        msg.style.backgroundColor = "red";
    }
}

const resetGame = () => {

    userScore = 0;
    compScore = 0;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;

    msg.innerText = "Play your move";

    clickSound.currentTime = 0;
    clickSound.play();
    msg.style.backgroundColor = "#16476A";
};

const playGame = (userChoice) => {

    //Generate Computer choice:
    const compChoice = genCompChoice();

    if(userChoice === compChoice){      //game draw 
        msg.innerText = `Game was draw! (${userChoice} vs ${compChoice})`;
        msg.style.backgroundColor = "#16476A";
    } else {
        let userWin = true;
        if(userChoice === "rock"){                                //obv computer rock to ho nhi sakta warna wahin uper draw ho jata; ab bacha paper or scissor.
            userWin = compChoice === "paper" ? false : true;      //user=rock => computer ka paper hai to user false(loose) nhi to true(win)
        } else if(userChoice === "paper"){
            userWin = compChoice === "rock" ? true : false;         
        } else {
            userWin = compChoice === "paper" ? true : false;
        }
        
        showWinner(userWin, userChoice, compChoice);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        clickSound.currentTime = 0;
        clickSound.play();
        let userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
}); 

resetBtn.addEventListener("click",resetGame);