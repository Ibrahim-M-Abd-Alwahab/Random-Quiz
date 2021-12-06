const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

const questionLimit = 8; // if you want all questions "quiz.length"

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

// push the question into availableQuestions array
function setAvailableQuestions() {
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        availableQuestions.push(quiz[i])
    }
}
// set question number and question and option
function getNewQuestion() {
    //set question number 
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + questionLimit;
    //get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    //set question Text
    questionText.innerHTML = currentQuestion.q;
    // get the position of 'questionIndex' from the availableQuestion Array
    const index1 = availableQuestions.indexOf(questionIndex);
    // remove the 'questionIndex' from the availableQuestion Array, so that the question does not repeat
    availableQuestions.splice(index1, 1);
    //  show question "img" if 'img'property exists
    if (currentQuestion.hasOwnProperty("img")) {
        const img = document.createElement("img");
        img.src = currentQuestion.img;
        questionText.appendChild(img);
    }

    // console.log(questionIndex);
    // console.log(availableQuestions);

    // set options
    // get the length of option
    const optionLen = currentQuestion.options.length;
    // push options into availableOptions Array
    for (let i = 0; i < optionLen; i++) {
        availableOptions.push(i);
    }
    optionContainer.innerHTML = "";
    let animationDelay = 0.15;

    // create options in html
    for (let i = 0; i < optionLen; i++) {
        // random option
        const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        // get the position of 'optonIndex' from the availableOptions
        const index2 = availableOptions.indexOf(optonIndex);
        // remove the 'optonIndex' from the availableOptions Array, so that the option does not repeat
        availableOptions.splice(index2, 1);

        // console.log(optonIndex);
        // console.log(availableOptions);

        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optonIndex];
        option.id = optonIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.append(option);
        option.setAttribute("onclick", "getResult(this)")
    }

    // console.log(availableOptions);
    questionCounter++

}

// get the result of the current attempt question

function getResult(element) {
    let id = parseInt(element.id);
    // console.log(typeof(id));
    // get the answer by comparing the id of clicked option  
    if (id === currentQuestion.answer) {
        // set the green color to the correct option 
        element.classList.add("correct");
        // add the indicator to correct mark
        updateAnswerIndicator("correct");
        correctAnswers++;
    } else {
        // set the red color to the incorrect option 
        element.classList.add("wrong");
        // add the indicator to wrong mark
        updateAnswerIndicator("wrong");

        // if the answer is incorrect the show the correct option by adding green color the correct option
        const optionLen = optionContainer.children.length;
        for (let i = 0; i < optionLen; i++) {
            if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
                optionContainer.children[i].classList.add("correct");

            }

        }
    }
    attempt++;
    unClickableOptions();
}
// TODO:  make all the options unClickable once the user select a option (RESTRICT THE USER TO CHANGE)
function unClickableOptions() {
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answerIndicator() {
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = questionLimit;
    for (let i = 0; i < totalQuestion; i++) {
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator)

    }
}

function updateAnswerIndicator(markType) {
    answersIndicatorContainer.children[questionCounter - 1].classList.add(markType);
}

function next() {
    if (questionCounter === questionLimit) {
        quizOver();
    } else {
        getNewQuestion();
    }
}

function quizOver() {
    // hide box
    quizBox.classList.add("hide");
    // show result box
    resultBox.classList.remove("hide");
    quizResult();
}
// get the quiz Result
function quizResult() {
    resultBox.querySelector(".total-question").innerHTML = questionLimit;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers / questionLimit) * 100;
    resultBox.querySelector(".total-percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + questionLimit;
}

function restQuiz() {
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
    availableQuestions = [];
}

function tryAgainQuiz() {
    // hide the result Box
    resultBox.classList.add("hide");
    // show the quiz Box
    quizBox.classList.remove("hide");
    restQuiz();
    startQuiz();
}

function goToHome() {
    // hide result box
    resultBox.classList.add("hide");
    // hide home box
    homeBox.classList.remove("hide");
    restQuiz();
}
// #### STARTING POINT ####
function startQuiz() {

    // HIDE home Box
    homeBox.classList.add("hide");
    // HIDE quiz Box
    quizBox.classList.remove("hide");
    //first we will set all questions in availableQuestions Array
    setAvailableQuestions();
    // secound we will call getNewQuestion() function 
    getNewQuestion();
    // to create indicator of answers
    answerIndicator();

};

window.onload = function() {
    homeBox.querySelector(".total-question").innerHTML = questionLimit;
};