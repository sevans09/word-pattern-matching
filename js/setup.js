$("button").click(function() {
    // clear colors from all other buttons
    $(".column").css("background-color", "lightyellow");

    var fired_button = $(this).text();
    var curr_word = $("#word").text();
    for (i in dict.words) {
        if (dict.words[i].word === curr_word) {
            //  check if clicked word is correct
            if (dict.words[i].correct === fired_button) {
                $(this).css("background-color", "green");
                // trigger new setup if correct
                setTimeout(function(){
                    newSetup();
                },500);
            }
            else {
                $(this).css("background-color", "red");
            }
        }
    }
});

function newSetup() {
    $(".column").css("background-color", "lightyellow");
    var num_entries = Math.round(Math.random() * 10) - 1;
    $("#word").html(dict.words[num_entries].word)
    for (j in dict.words[num_entries].matches) {
        var word = "#word" + j;
        $(word).html(dict.words[num_entries].matches[j])
    }
}