// declare the information array
var userInformation = [];



function displayHighscores() {
  userInformation = [];
  userInformation = JSON.parse(localStorage.getItem("userInfo"));
  var scores = document.getElementById("highscores");
// check if the local storage has data and sort
  if (userInformation != null && userInformation.length > 0) {
    userInformation.sort((a, b) => {
      return parseInt(b.finalScore) - parseInt(a.finalScore);
    });

    for (i = 0; i <= userInformation.length - 1; i++) {
      var li = document.createElement("li");
      li.innerHTML =
        userInformation[i].userInitials + "  " + userInformation[i].finalScore;
      scores.appendChild(li);
    }
  } else {
    scores.textContent = "No Scores Available";
  }
}
// clear highscores from the local storage
function clearHighscores() {
  localStorage.clear();
  location.reload();
}

var clearscoresbtnEL = document.getElementById("clearscoresbtn");
clearscoresbtnEL.addEventListener("click", clearHighscores);
// method will get called on-load.
displayHighscores(); 
