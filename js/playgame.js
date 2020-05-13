function startGame() {
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
  console.log("out of time")
  var str = $("#score").text();
  var curr_score = str.split(" ").pop();
  console.log('curr score is', curr_score);
  $("#scoreModal").text("Score: " + curr_score);
  $('#endModal').modal('show');
  addPost("sook", curr_score);
}


function addPost(name, score) {
    const database = firebase.database().ref('Scores');
    const postRef = database.push();

    const postData = {
        player: name,
        playerScore: score,
    };
    console.log("in add post", name, score)

    postRef.set(postData)
    .then(() => {
      const success = {
        success: true,
      };
      console.log("post added")
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
