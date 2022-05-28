import $ = require('jquery');


export default async function handleInput() {
    $(".field input").on("input", function (event) {
        let val = $(this).val()?.toString().toLowerCase();
        $(`.wordList .word[data-atr*='${val}']`).get(0)?.scrollIntoView();
    });
}