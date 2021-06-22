var userInformation = [];

function renderMessage() {
    // scoresMenu.classList.add("hidden");
    // questionMenu.classList.add("hidden");
    // viewHighScoreMenu.classList.remove("hidden");
    // startMenu.classList.add("hidden");
  
    // var values = userInitials.value + "  " + finalScore ;
    // console.log("values   >>>>>>/ " + values);
    //  var element = document.getElementById("message");
    //  element.innerHTML = values;
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
      
    //   var ol = document.createElement("ol");
    //   ol.setAttribute("style", "padding: 20px; margin: 0;");
    //   ol.setAttribute("id", "theList");
      for (i = 0; i <= userInformation.length - 1; i++) {
        var li = document.createElement("li");
        console.log("userInformation[i]  >> " + userInformation[i].finalScore);
        console.log("userInformation[i]  >> " + userInformation[i].userInitials);
        li.innerHTML =
          userInformation[i].userInitials + "  " + userInformation[i].finalScore;
          scores.appendChild(li);
        // li.setAttribute("style", "display: block;");
        //ol.appendChild(li); // append li to ul.
      }
    //   scores.appendChild(ol);
      // location.href = "./viewHighScore.html";
    } else {
      scores.textContent = "No Scores Available";
    }
  }
  
  function clearHighscores(){
      // (and reload)
      //localStorage.removeItem("highscores");
      localStorage.clear();
      location.reload();
  }
  var clearscoresbtnEL = document.getElementById("clearscoresbtn");
  clearscoresbtnEL.addEventListener("click", clearHighscores);
  renderMessage(); // method will get called on-load.