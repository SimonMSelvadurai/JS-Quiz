/**
 * Declaring the Global Variables
 *
 */

var quiz;
var timer;
var interval;
var userInitials;
var finalScore;
var userInformation = [];

/**
 * Declaring the HTML elements / id selectors
 * Read the id/class selectors and add actions from JS
 */
var timerEl = document.querySelector("#timer");
var startbtnEL = document.querySelector("#startbtn");
var scoresMenu = document.getElementById("scores-menu");
var startMenu = document.getElementById("start-menu");
var questionMenu = document.getElementById("question-menu");
var submitbtnEL = document.querySelector("#submitbtn");
var viewHighScoreLinkEL = document.querySelector("#scoreCards");
var userInitials = document.querySelector("#initials");

startbtnEL.addEventListener("click", startQuiz);
submitbtnEL.addEventListener("click", submitScores);

/**
 * Window on-load function, sets the default parameter/functionalities
 * @param Quiz{questions} - Load the Quiz Constructor.
 * Load the populate() method, to assign the title,choices(buttons)in UI.
 */
window.onload = init;

function init() {
  clearForm();
  startMenu.classList.remove("hidden");
  questionMenu.classList.add("hidden");
  quiz = new Quiz(questions);
  populate();
}

/**
 * This function triggers functions while start quiz button got cliked
 * show/hides the sections of the HTML elements.
 * Starts the timer
 * Quiz Logic /functions
 */

function startQuiz() {
  menuController();
  startTimer();
  populate();
}

/**
 * This function show/hides the sections of the HTML Menu elements.
 * Stops showing the home page
 * displays the quiz menu
 */
 function menuController() {
  startMenu.classList.add("hidden");
  questionMenu.classList.remove("hidden");
}

function submitScores() {
  userInitials = document.querySelector("#initials");

  if (userInitials.value == "") {
    alert("Please enter the Initials!!!");
  } else {
    finalScore = getTimer();
    
    var userInfo = {
      finalScore: finalScore,
      userInitials: userInitials.value,
    };

    var userInformation = JSON.parse(localStorage.getItem("userInfo"));
    if (userInformation == null) {
      userInformation = [];
    }
    userInformation.push(userInfo);
    localStorage.setItem("userInfo", JSON.stringify(userInformation));
    location.href = "highscores.html";
    
  }
}

function clearForm() {
  setTimer(70);
}

/**
 * This function generate the timers for every seconds.
 */
function startTimer() {
  timer = 70;
  interval = setInterval(() => {
    timer--;
    setTimer(timer);
    if (timer < 1) {
      stop();
      showScores();
    }
  }, 1000);
}

function stop() {
  clearInterval(interval);
}


// Assign the Timercount on UI
function setTimer(timer) {
  this.timer = timer;
  timerEl.textContent = timer;
}

// get the current timer
function getTimer() {
  return timer;
}

/**
 * @param questions object
 * Default constructor, set the score as 0, loads the questions object array to the 
 * local element (this) 
 */
function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

/**
 * @param questions object
 * get the current index of the question 
 * to the local element (this)
 */
Quiz.prototype.getQuestionIndex = function () {
  return this.questions[this.questionIndex];
};

/**
 * @param answer object
 * checks the answer selected is correct or not
 * incorrect answers will penalize scoretime by ten seconds
 * return question index object
 */

Quiz.prototype.guess = function (answer) {
  if (this.getQuestionIndex().isCorrectAnswer(answer)) {
    this.score++;
  } else {
    timer = timer - 10;
    setTimer(timer);
  }

  this.questionIndex++;
};

/**
 * checks the if the question index vs total no of questions
 * return boolean based on the resutl
  */
Quiz.prototype.isEnded = function () {
  return this.questionIndex === this.questions.length;
};

/**
 * @param text, choices, answer 
 * local initialize in the constructor
 */
function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

/**
 * @param choice
 * check if the choice was correct or wrong
 */
Question.prototype.isCorrectAnswer = function (choice) {
  showAnswer(this.answer === choice);
  return this.answer === choice;
};

/**
 * Present the quiz with questions and assign to the button
 */
function populate() {
  if (quiz.isEnded() || timer < 1) {
    showScores();
    stop(interval);
  } else {
    // show question
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionIndex().text;
    // show options
    var choices = quiz.getQuestionIndex().choices;
    for (var i = 0; i < choices.length; i++) {
      var element = document.getElementById("choice" + i);
      element.innerHTML = choices[i];
      guess("btn" + i, choices[i]);
    }
  }
} 

/**
 * @param id, guess
 * manupulate the quiz logic with the user choices per question
 */
function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function () {
    quiz.guess(guess);
    populate();
  };
}

/**
 * @param answer
 * display the answer to the HTML element ( True or False)
 */
function showAnswer(answer) {
  var element = document.getElementById("answer");
  element.classList.add("answer");
  var text = "";
  if (answer) {
    element.classList.remove("answer");
    text = "CORRECT ANSWER !!! " ; 
  } else{
    text = "OOPS WRONG ANSWER !!!" ; 
  }
  element.innerHTML = text;
}
/**
 * @param 
 * display the scores - timer
 */
function showScores() {
  scoresMenu.classList.remove("hidden");
  questionMenu.classList.add("hidden");

  var element = document.getElementById("scores");
  element.innerHTML = timer;
  setTimer(timer);
}

// create questions here
var questions = [
  new Question(
    "Hyper Text Markup Language Stands For?",
    ["JavaScript", "XHTML", "CSS", "HTML"],
    "HTML"
  ),
  new Question(
    "Which language is used for styling web pages?",
    ["HTML", "JQuery", "CSS", "XML"],
    "CSS"
  ),
  new Question(
    "Which is not a JavaScript Framework?",
    ["Python Script", "JQuery", "Django", "NodeJS"],
    "Django"
  ),
  new Question(
    "Which is used to Connect To the Database?",
    ["PHP", "HTML", "JS", "All"],
    "PHP"
  ),
];
