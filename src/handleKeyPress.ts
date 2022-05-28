import $ = require('jquery');

export default async function handleKeyPress() {
    $(document).keypress(function (event) {
        $(".wordList input").focus();
    });
}