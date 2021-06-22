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
// var goBackbtnEL = document.getElementById("gobackbtn");
// var clearscoresbtnEL = document.getElementById("clearscoresbtn");
 var scoresMenu = document.getElementById("scores-menu");
var startMenu = document.getElementById("start-menu");
var questionMenu = document.getElementById("question-menu");
// var viewHighScoreMenu = document.getElementById("viewHighscore-menu");
var submitbtnEL = document.querySelector("#submitbtn");
var viewHighScoreLinkEL = document.querySelector("#scoreCards");
var userInitials = document.querySelector("#initials");
// var headerMenu = document.getElementById("menu");

// function getURL() {
//   alert("The URL of this page is: " + window.location.href);
//   renderMessage();
// }

/**
 * Window on-load function, sets the default parameter/functionalities
 * @param Quiz{questions} - Load the Quiz Constructor.
 * Load the populate() method, to assign the title,choices(buttons)in UI.
 */
window.onload = init;
function init() {
  console.log("init()");
  clearForm();
  startMenu.classList.remove("hidden");
  questionMenu.classList.add("hidden");
  // viewHighScoreMenu.classList.add("hidden");
  // headerMenu.classList.remove("hidden");
  // create quiz
  quiz = new Quiz(questions);
  // display quiz
  populate();
}

function submitScores() {
  console.log("entering submitScores");
  userInitials = document.querySelector("#initials");

  if (userInitials.value == "") {
    alert("Please enter the Initials");
  } else {
    console.log("scoresContainerscoresContainer" + userInitials.value);
    finalScore = getTimer();
    console.log("scoresContainerscoresContainer" + finalScore);
    // event.preventDefault();

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
    //clearForm();
  }
}

function clearForm() {
  console.log("clearForm");
  console.log("clearForm    userInitials.value   " + userInitials.value);
  setTimer(70);
  //document.querySelector(".message").innerHTML = "";
  // document.getElementById("message").innerHTML = "";
  // document.getElementById("initials").innerHTML ="";
  // document.querySelector("#initials").innerHTML = "";
  // var test = document.querySelector("#initials");
  // console.log("test test test test    >>>>>>/ " + test.value);
}

function renderMessage() {
  // location.href = "./viewHighScore.html";
  // scoresMenu.classList.add("hidden");
  questionMenu.classList.add("hidden");
  // viewHighScoreMenu.classList.remove("hidden");
  // headerMenu.classList.add("hidden");
  startMenu.classList.add("hidden");

  // var values = userInitials.value + "  " + finalScore ;
  // console.log("values   >>>>>>/ " + values);
  //  var element = document.getElementById("message");
  //  element.innerHTML = values;
  performLocalStorage();
}
function performLocalStorage() {
  userInformation = [];
  var userInformation = JSON.parse(localStorage.getItem("userInfo"));
  console.log(userInformation.length);
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
      console.log("userInformation[i]  >> " + userInformation[i].finalScore);
      console.log("userInformation[i]  >> " + userInformation[i].userInitials);
      li.innerHTML =
        userInformation[i].userInitials + "  " + userInformation[i].finalScore;
      li.setAttribute("style", "display: block;");
      ol.appendChild(li); // append li to ul.
    }
    scores.appendChild(ol);
    // location.href = "./viewHighScore.html";
  } else {
    var temp = document.getElementById("highscores");
    temp.textContent = "No Scores Available";
  }
}

// function clearHighscores(){
//     // (and reload)
//     localStorage.removeItem("highscores");
//     location.reload();
// }
// }
// function viewHighScores() {
//   // scoresMenu.classList.add("hidden");
//   questionMenu.classList.add("hidden");
//   viewHighScoreMenu.classList.remove("hidden");
//   //headerMenu.classList.add("hidden");
//   startMenu.classList.add("hidden");
//   var test = localStorage.getItem("userInfo");
//   console.log("aaaaaaaaaaaa >> " + test);
//   userInformation = [];
//   var userInformation = JSON.parse(localStorage.getItem("userInfo"));
//   // console.log("Name.finalScore" + Name.finalScore);
//   // console.log("Name.userInitials" + Name.userInitials);
//   var scores = document.getElementById("message");
//   var ol = document.createElement("ol");
//   ol.setAttribute("style", "padding: 20px; margin: 0;");
//   ol.setAttribute("id", "theList");
//   for (i = 0; i <= userInformation.length - 1; i++) {
//     var li = document.createElement("li");
//     initial = userInformation.get;
//     li.innerHTML = i + 1 + "." + userInformation[i];
//     li.setAttribute("style", "display: block;");
//     ol.appendChild(li); // append li to ul.
//   }
//   scores.appendChild(ol); // add list to the container.
//   // location.href = "./viewHighScore.html";
//   // var arr = [];
//   // arr.push(Name.userInitials + "  " + Name.finalScore);
//   // var scores = document.getElementById("message");
//   // var ol = document.createElement("ol");
//   // ol.setAttribute("style", "padding: 20px; margin: 0;");
//   // ol.setAttribute("id", "theList");

//   // for (i = 0; i <= arr.length - 1; i++) {
//   //   var li = document.createElement("li"); // create li element.
//   //   li.innerHTML = i + 1 + "." + arr[i]; // assigning text to li using array value.
//   //   li.setAttribute("style", "display: block;"); // remove the bullets.
//   //   ol.appendChild(li); // append li to ul.
//   // }
//   // scores.appendChild(ol); // add list to the container.
// }

/**
 * adding eventListener to the start button
 * @param on click action, startQuiz method will be triggered
 * function invocation
 */

startbtnEL.addEventListener("click", startQuiz);
submitbtnEL.addEventListener("click", submitScores);
// goBackbtnEL.addEventListener("click", init);
// clearscoresbtnEL.addEventListener("click", clearHighscores);
//viewHighScoreLinkEL.addEventListener("click", getURL);

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
  // viewHighScoreMenu.classList.add("hidden");
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
  console.log("SET TIMER     RRRRRRRRRR " + timer);
  this.timer = timer;
  timerEl.textContent = timer;
}
function getTimer() {
  console.log(">>>>>getTimer timer timer timer timer  " + timer);
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
  // console.log(".guess =");
  if (this.getQuestionIndex().isCorrectAnswer(answer)) {
    this.score++;
  } else {
    timer = timer - 10;
    setTimer(timer);
  }

  this.questionIndex++;
  console.log("this.questionIndex++;");
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
    // clearInterval();
    stop(interval);
  } else {
    // show question
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionIndex().text;
    // console.log("element"  + element);
    // show options
    var choices = quiz.getQuestionIndex().choices;
    // console.log("choices"  + choices);
    for (var i = 0; i < choices.length; i++) {
      var element = document.getElementById("choice" + i);
      element.innerHTML = choices[i];
      guess("btn" + i, choices[i]);
    }

    // showProgress();
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

  // var gameOverHTML ;
  // // gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
  // gameOverHTML  = "Your final Score is: " + timer ;
  // // var element = document.getElementById("quiz");scores-menu
  // var element = document.getElementById("scores");
  // element.innerHTML = gameOverHTML;

  var element = document.getElementById("scores");
  element.innerHTML = timer;
  setTimer(timer);
}

// create questions here
var questions = [
  new Question(
    "Hyper Text Markup Language Stand For?",
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
    "Which is used for Connect To Database?",
    ["PHP", "HTML", "JS", "All"],
    "PHP"
  ),
];
