// Update the count down every 1 second
$( document ).ready(function() {
    console.log( "ready!" );
});
function startTimer() {
    console.log('starting timer')
    var timeleft = 120;
    var downloadTimer = setInterval(function(){
      if(timeleft <= 0){
        clearInterval(downloadTimer);
      }
      document.getElementById("demo").value = 10 - timeleft;
      document.getElementById("demo").innerHTML = timeleft;
      timeleft -= 1;
    }, 1000);
}

