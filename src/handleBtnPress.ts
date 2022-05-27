import $ = require('jquery');

export default async function handleBtnPress() {
    $(document).keypress(function (event) {
        if (event.offsetY ?? 0 > 500)
            $(".wordList input").get(0)?.scrollIntoView();
        $(".wordList input").focus();
    });
}