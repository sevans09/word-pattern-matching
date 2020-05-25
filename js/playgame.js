function startGame() {
    leaderboard.innerText = "";
    var dbRef = firebase.database().ref();
    dbRef.once('value').then(function(snapshot) {
        first =  snapshot.val().topScore;
        second =  snapshot.val().secondScore;
        third =  snapshot.val().thirdScore;

        firstName = snapshot.val().topName;
        secondName = snapshot.val().secondName;
        thirdName = snapshot.val().thirdName;

        leaderboard.innerText += firstName + " " + first + "\n";
        leaderboard.innerText += secondName + " " + second  + "\n";
        leaderboard.innerText += thirdName + " " + third  + "\n";
    });
    $("#score").text("Score: 0");
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
}

// places score in correct bin
// called when user clicks submit button on end modal
function addPost(name, score) {
    var dbRef = firebase.database().ref();
    var top, second, third;
    // want to add high score here
    // verify that the button wasn't double clicked
    // check that name and scores don't match
    dbRef.once('value').then(function(snapshot) {
        top =  snapshot.val().topScore;
        second =  snapshot.val().secondScore;
        third =  snapshot.val().thirdScore;

        if (score > top) {
            // move all down
            console.log("top is", top)
            dbRef.update({ topScore: Number(score) });
            dbRef.update({ secondScore: top });
            dbRef.update({ thirdScore: second });
        }
        else if (score > second) {
            // move bottom two down
            dbRef.update({ secondScore: Number(score) });
            dbRef.update({ thirdScore: second });
        }
        else if (score > third) {
            // replace lowest score
            dbRef.update({ thirdScore: Number(score) });
        }
        
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}
