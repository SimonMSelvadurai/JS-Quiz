var userInformation = [];

/**
 * API to render
 */
function renderMessage() {
  performLocalStorage();
}

function performLocalStorage() {
  userInformation = [];
  userInformation = JSON.parse(localStorage.getItem("userInfo"));
  var scores = document.getElementById("highscores");

  if (userInformation != null && userInformation.length > 0) {
    userInformation.sort((a, b) => {
      return parseInt(b.score) - parseInt(a.score);
    });

    for (i = 0; i <= userInformation.length - 1; i++) {
      var li = document.createElement("li");
      console.log("userInformation[i]  >> " + userInformation[i].finalScore);
      console.log("userInformation[i]  >> " + userInformation[i].userInitials);
      li.innerHTML =
        userInformation[i].userInitials + "  " + userInformation[i].finalScore;
      scores.appendChild(li);
    }
  } else {
    scores.textContent = "No Scores Available";
  }
}

function clearHighscores() {
  localStorage.clear();
  location.reload();
}
var clearscoresbtnEL = document.getElementById("clearscoresbtn");
clearscoresbtnEL.addEventListener("click", clearHighscores);
renderMessage(); // method will get called on-load.
