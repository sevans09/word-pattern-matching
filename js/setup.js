function newSetup() {
    $(".column").css("background-color", "lightyellow");
    var num_entries = Math.round(Math.random() * 34) - 1;
    var num_matches = dict.words[num_entries].matches.length;
    var rand_match_1 = Math.round(Math.random() * num_matches) - 1;
    $("#word").html(dict.words[num_entries].matches[rand_match_1])
    var num_matches = dict.words[num_entries].matches.length;
    var rand_match_2 = Math.round(Math.random() * num_matches);
    var switch_num = Math.round(Math.random() * 1);
    console.log("sswitch_numis", switch_num);
    console.log("rsand maatch is, ", rand_match_2)
    // then randomize length
    //  then mod by number of words

    switch_num = switch_num *  Math.round(Math.random() * num_matches);
    switch_num = switch_num % num_matches;
    rand_match_2 = switch_num;
    if (rand_match_2 == rand_match_1) {
        rand_match_2 = (rand_match_2 + 1) % num_matches
    }
    $("#word0").html(dict.words[num_entries].matches[rand_match_2])
}