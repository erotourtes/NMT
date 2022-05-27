import $ = require('jquery');


export default async function handleInput() {
    let words = $(".wordList .word");
    let findedDiv = $(".finded");
    $(".field input").on("input", function (event) {
        let val = $(this).val()?.toString().toLowerCase();
        $(`.wordList .word[data-atr*='${val}']`).get(0)?.scrollIntoView();
    });

}