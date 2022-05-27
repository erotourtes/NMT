import $ = require('jquery');
import FormatWordWithSpan from './FormatWordWithSpan';
import WordsContainerI from './Interfaces/wordsContainerI';

const renderArray = (words: WordsContainerI) => {
    let renderedArray = ""
    Object.keys(words).forEach((letter) => {
        renderedArray += `<div class="letter"><h1>${letter}</h1></div>`;
        words[letter].forEach(words => {
            renderedArray += `
            <div class="word">
                <h1>${FormatWordWithSpan.formatWordWithSpan(words)}</h1>
                <h1>${words.answerd} ${words.mistakes}</h1>
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
        overflow: 'scroll',
    });
}

export default function handleStatisticsRendering(answerd: WordsContainerI, notAnswered: WordsContainerI) {
    lockScrolling();

    $("body").prepend(`
    <div class="statisticsWraper">
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