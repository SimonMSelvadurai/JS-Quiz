/**
 * Declaring the Global Variables
 *
 */
var questionNumber = 0;
var quiz;
var timer;
var interval;
var userInitials;
var finalScore;
var userInfoArray = [];
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
    renderMessage();
  }
}

function clearForm() {
  setTimer(70);
}

function renderMessage() {
  questionMenu.classList.add("hidden");
  startMenu.classList.add("hidden");

  performLocalStorage();
}

function performLocalStorage() {
  userInformation = [];
  var userInformation = JSON.parse(localStorage.getItem("userInfo"));
  if (userInformation != null) {
    userInformation.sort((a, b) => {
      return parseInt(b.score) - parseInt(a.score);
    });
    var scores = document.getElementById("highscores");
    var ol = document.createElement("ol");
    ol.setAttribute("style", "padding: 20px; margin: 0;");
    ol.setAttribute("id", "theList");
    for (i = 0; i <= userInformation.length - 1; i++) {
      var li = document.createElement("li");
      li.innerHTML =
        userInformation[i].userInitials + "  " + userInformation[i].finalScore;
      li.setAttribute("style", "display: block;");
      ol.appendChild(li); // append li to ul.
    }
    scores.appendChild(ol);
  } else {
    var temp = document.getElementById("highscores");
    temp.textContent = "No Scores Available";
  }
}

/**
 * adding eventListener to the start button
 * @param on click action, startQuiz method will be triggered
 * function invocation
 */

startbtnEL.addEventListener("click", startQuiz);
submitbtnEL.addEventListener("click", submitScores);

/**
 * function definition
 * @param on-click action, startQuiz function , Timers
 * This function show/hides the sections of the HTML elements.
 */

function startQuiz() {
  menuController();
  startTimer();
  populate();
}

/**
 * This function show/hides the sections of the HTML elements.
 */
function menuController() {
  startMenu.classList.add("hidden");
  questionMenu.classList.remove("hidden");
}
/**
 * This function generate the timers for every seconds.
 */
function startTimer() {
  timer = 70;
  interval = setInterval(() => {
    timer--;
    setTimer(timer);
    console.log(timer);
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

function getTimer() {
  return timer;
}

/**
 * @param questions object
 * Default constructor, set the score as 0, loads the questions object array to the local element (this)
 * sets the questionIndex as 0
 */
function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

/**
 * @param questions object
 * Default constructor, set the score as 0, loads the questions object array to the local element (this)
 * sets the questionIndex as 0
 */
Quiz.prototype.getQuestionIndex = function () {
  return this.questions[this.questionIndex];
};

Quiz.prototype.guess = function (answer) {
  if (this.getQuestionIndex().isCorrectAnswer(answer)) {
    this.score++;
  } else {
    timer = timer - 10;
    setTimer(timer);
  }

  this.questionIndex++;
};

Quiz.prototype.isEnded = function () {
  return this.questionIndex === this.questions.length;
};

function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
  showAnswer(this.answer === choice);
  return this.answer === choice;
};

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

function guess(id, guess) {
  console.log("guess(id, guess)");
  var button = document.getElementById(id);
  button.onclick = function () {
    quiz.guess(guess);
    populate();
  };
}

function showAnswer(answer) {
  var element = document.getElementById("answer");
  element.classList.add("answer");
  if (answer) {
    element.classList.remove("answer");
  }
  element.innerHTML = answer;
}

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
