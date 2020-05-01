function newSetup() {
    $(".column").css("background-color", "lightyellow");
    var num_entries = Math.round(Math.random() * 10) - 1;
    $("#word").html(dict.words[num_entries].word)
    for (j in dict.words[num_entries].matches) {
        var word = "#word" + j;
        $(word).html(dict.words[num_entries].matches[j])
    }
}