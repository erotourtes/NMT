import $ = require('jquery');
import FormatWordWithSpan from './FormatWordWithSpan';
import WordsContainerI from './Interfaces/wordsContainerI';

const renderArray = (words: WordsContainerI) => {
    let renderedArray = ""
    Object.keys(words).forEach((letter) => {
        renderedArray += `<div class="letter"><h1>${letter}</h1></div>`;
        words[letter].forEach(word => {
            renderedArray += `
            <div class="word ${word.mistakes > 0 ? "mistake" : ""}">
                <h1>${FormatWordWithSpan.formatWordWithSpan(word)}</h1>
                <h1 class="answered_mistakes">${word.answerd} ${word.mistakes}</h1>
            </div>`
        })
    });

    return renderedArray;
}
const lockScrolling = () => {
    $('html, body').css({
        overflow: 'hidden',
    });
}

const unlockScrolling = () => {
    $('html, body').css({
        overflow: 'visible',
    });
}

export default function handleStatisticsRendering(answerd: WordsContainerI, notAnswered: WordsContainerI) {
    lockScrolling();

    let answeredWords = 0;
    Object.keys(answerd).forEach(letter => answeredWords += answerd[letter].length)

    $("body").prepend(`
    <div class="statisticsWraper">
        <h1>${answeredWords} / 232 </h1>
        <button class="closeStatistics">close</button>
        <h1>History</h1>
        <div class="list">
            ${renderArray(answerd)}
        </div>
        <div class="list">
            ${renderArray(notAnswered)}
        </div>
    </div>
    `);

    $(".closeStatistics").click(function () {
        $(".statisticsWraper").remove();
        unlockScrolling();
    })
}