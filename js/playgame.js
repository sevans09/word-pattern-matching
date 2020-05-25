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
        console.log('third nam and score', thirdName, third)

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
    var top, second, third, topName, secondName, thirdName;
    // want to add high score here
    dbRef.once('value').then(function(snapshot) {
        top =  snapshot.val().topScore;
        second =  snapshot.val().secondScore;
        third =  snapshot.val().thirdScore;

        topName =  snapshot.val().topName;
        secondName =  snapshot.val().secondName;
        thirdName =  snapshot.val().thirdName;

        if (score > top && !checkAlreadyClicked(name, score, topName, top, secondName, second, thirdName, third)) {
            // move all down
            console.log("third name is", thirdName, third)
            dbRef.update({ topScore: Number(score) });
            dbRef.update({ topName: name });
            dbRef.update({ secondScore: top });
            console.log("third name is", thirdName, third)
            dbRef.update({ secondName: topName });
            console.log("third name is", thirdName, third)
            dbRef.update({ thirdScore: second });
            console.log("third name is", thirdName, third)
            dbRef.update({ thirdName: secondName });
            console.log("third name is", thirdName, third)
        }
        else if (score > second && !checkAlreadyClicked(name, score, topName, top, secondName, second, thirdName, third)) {
            // move bottom two down
            dbRef.update({ secondScore: Number(score) });
            dbRef.update({ secondName: name });
            dbRef.update({ thirdScore: second });
            dbRef.update({ thirdName: secondName });
        }
        else if (score > third && !checkAlreadyClicked(name, score, topName, top, secondName, second, thirdName, third)) {
            // replace lowest score
            console.log("third name is", thirdName, third)
            dbRef.update({ thirdScore: Number(score) });
            dbRef.update({ thirdName: name });
        }
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}

function checkAlreadyClicked(name, score, topName, topScore, secondName, secondScore, thirdName, thirdScore) {
    if (name === topName && score === topScore ||
        name === secondName && score === secondScore ||
        name === thirdName && score === thirdScore) {
            return true;
    }
    else return false;
}