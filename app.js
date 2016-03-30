$("hero").click(function() {
    var fontSize = parseInt($(this).css("font-size"));
    fontSize = fontSize + 1 + "px";
    $('hero').css({'font-size':fontSize});
});
