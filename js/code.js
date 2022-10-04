let isPlaying = false;
let score;
let counter;
let timeRemaining;
let countdownValue = document.getElementById("countdown-value");
let correctAnswer;
let wrongAnswer;

document.getElementById("start-reset").onclick = function (){
    if(isPlaying === true){
        location.reload();
    }
    else {
        isPlaying = true;
        document.getElementById("start-reset").innerHTML = "Reset Game";

        score = 0;
        document.getElementById("score-value").innerHTML = score;

        show("countdown");
        timeRemaining = 60;
        countdownValue.innerHTML = timeRemaining;

        hide("gameover");

        startCountdown();

        generateQA();
    }
}


// FUNCTIONS

function startCountdown(){
    counter = setInterval(function(){
        timeRemaining--; 
        countdownValue.innerHTML = timeRemaining; 
        if(timeRemaining === 0){
            stopCountdown();
            document.getElementById("gameover").innerHTML = "<p>Game Over!</p><p>Your score is " + score + ".</p>";
            show("gameover");
            hide("countdown");
            hide("correct");
            hide("wrong");
            isPlaying = false;
            document.getElementById("start-reset").innerHTML = "Start Game"
        }
    }, 1000);
}

function stopCountdown(){
    clearInterval(counter);
}

function hide(id){
    document.getElementById(id).style.display = "none";
}

function show(id){
    document.getElementById(id).style.display = "block";
}

function generateQA(){
    let x = Math.round(Math.random() * 9) + 1;
    let y = Math.round(Math.random() * 9) + 1;
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + " x " + y;
    let correctPosition = Math.round(Math.random() * 3) + 1;
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer;

    let answers = [correctAnswer];
    for(let i = 1; i < 5; i++){
        if(i !== correctPosition){
            do {
                wrongAnswerGenerator();
            } while(answers.indexOf(wrongAnswer) > -1);

            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}

function wrongAnswerGenerator(){
    wrongAnswer = (Math.round(Math.random() * 9) + 1) * (Math.round(Math.random() * 9) + 1);
}