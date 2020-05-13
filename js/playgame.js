function startGame() {
    $("#score").text("Score: 0");
    var dbRef = firebase.database().ref('Scores/-M7EkiDbkyso73VfwuIs').child('playerScore');
    // want to add high score here
    dbRef.on('value', snap => leaderboard.innerText = snap.val());
    var curr_top = $("#leaderboard").text();
    $("#leaderboard").html("Top score is " + curr_top);
    startTimer();
}

function startTimer() {
    var timeleft = 9;
    var downloadTimer = setInterval(function(){
      if(timeleft <= 0){
        clearInterval(downloadTimer);
        outOfTime();
      }
      document.getElementById("timer").value = 10 - timeleft;
      document.getElementById("timer").innerHTML = timeleft + "s remaining";
      timeleft -= 1;
    }, 1000);
}

function outOfTime() {
  var str = $("#score").text();
  var curr_score = str.split(" ").pop();
  $("#scoreModal").text("Score: " + curr_score);
  $('#endModal').modal('show');
  addPost("sook", curr_score);
  var curr_top = $("#leaderboard").text();
  $("#leaderboard").html("Top score is " + curr_top);
}


function addPost(name, score) {
    const database = firebase.database().ref('Scores');
    const postRef = database.push();

    const postData = {
        player: name,
        playerScore: score,
    };

    postRef.set(postData)
    .then(() => {
      const success = {
        success: true,
      };
      return success;
    })
    .catch((error) => {
      const success = {
        success: false,
        errorMessage: error.message,
      };
      return success;
    });
}
