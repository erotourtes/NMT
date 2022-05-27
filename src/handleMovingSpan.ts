import $ = require('jquery');


export default async function handleMovingSpan() {
    let prevIndex = 0;
    let prevElement = $(".accent").children().first();
    $(".accent").children().each(function (spanIndex) {
        $(this).hover(() => {
            if (prevIndex > spanIndex) {
                $(this).removeClass().addClass("right");
                prevElement.removeClass().addClass("right");
            }
            else {
                $(this).removeClass().addClass("left");
                prevElement.removeClass().addClass("left");
            }
            prevIndex = spanIndex;
            prevElement = $(this);
        });
    })
}