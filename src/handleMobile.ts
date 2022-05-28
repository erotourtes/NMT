import $ = require('jquery');

export default function handelMobile() {
    if (!window.matchMedia("(max-width: 767px)").matches)
        return;

    $("header, .history, .wordList").hide();


    let style = $(`
    <style>
        .answered_mistakes { display: none; }
        .container { justify-content: start; }
        .closeStatistics { bottom: 50px; }
    </style>`);
    $('html > head').append(style);

    $(".container").append($(".accent").detach())

    $(".container").append($(".extraInfo").remove())
}