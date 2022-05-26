import { accent } from './data/data';
import { ParseString } from './ParseString'
import { WordsContainerI } from "./Interfaces/wordsContainerI"
import { WordI } from './Interfaces/wordI';
import Color from './colors';
import $ = require('jquery');

class Accent {
    private currentWord: WordI = { word: "", mistakes: 0, answerd: 0, correctIndexes: [], extraInformation: "" };

    constructor(
        readonly words = ParseString.parseAccent(accent),
        readonly answered: WordsContainerI = {},
        private keys = Object.keys(words),
        readonly notAnswered: WordsContainerI = {}
    ) {
        keys.forEach(letter => notAnswered[letter] = [...words[letter]]);

        this.start();
        this.handleBtnClick();
    }


    private start() {
        this.currentWord = this.getWord();
        this.handleAddWord()
        this.handleSpanClick();
        this.addStatistics();
    }

    private handleBtnClick() {
        $(".menu .newBtn").click(() => this.start());

        $(".menu .correctBtn").click(() => {
            const word = this.currentWord;
            word.answerd++;
            word.mistakes++;
            this.colorAllSpan(Color.main);
            this.lockSpanClicking();
        });

        $(".menu .statisticsBtn").click(() => {
            alert("handleIT");
        });

        let isHidden = false;
        $(".history button").click(() => {
            $(".history div").children().each((wordindex, self) => {
                $(self).animate({
                    left: isHidden ? "0px" : "50px",
                    opacity: isHidden ? 1 : 0,
                }, 250 - 50 * wordindex)
            }).promise().done(() => {
                isHidden = !isHidden;
                $(".history div").toggle();
                $(".history button").text(isHidden ? "Dumb list" : "Fuck off");
            });
        });
    }

    private addStatistics() {
        this.keys.forEach((key) => {
            this.words[key].forEach((word) => {
                $(".statistics").append(`
                <div class="word" data-atr=${word.word.toLowerCase()}>
                    <h2>${this.formatWordWithSpan(word)}</h2>
                    <div>
                    <h2>${word.mistakes} ${word.answerd}</h2>
                    </div>
                </div>`);
            });
        });
    }

    private lockSpanClicking() {
        $(".accent span").unbind();
    }

    private handleAddWord() {
        $(".accent").empty().append(this.wrapWordInSpan(this.currentWord.word.toLowerCase()));
        $(".extraInfo").empty().append(this.currentWord.extraInformation);
    }

    private handleSpanClick() {
        let word = this.currentWord;
        $(".accent span").each((spanIndex, span) => {
            $(span).click(() => {
                let isCorrect = word.correctIndexes.includes(spanIndex);
                if (!isCorrect) {
                    this.colorSpan(Color.error, spanIndex);
                    setTimeout(() => { this.start() }, 2000);
                    this.addToHistoryList();
                } else
                    setTimeout(() => { this.start() }, 500);
                this.colorAllSpan(Color.main);
                this.lockSpanClicking();
            });
        });
    }

    private addToHistoryList() {
        $(".history div").append(`<h2 class="word">${this.formatWordWithSpan(this.currentWord)}</h2>`)
    }

    private formatWordWithSpan(word: WordI) {
        let formatedWord = word.word.split("")
            .map(letter => {
                return (letter.toLocaleUpperCase() === letter && letter !== "’") ?
                    `${this.wrapWordInSpan(letter.toLowerCase())}` :
                    letter;
            }).join("");


        return `${formatedWord}`
    }

    private colorAllSpan(color: string) {
        this.currentWord.correctIndexes.forEach((index) => this.colorSpan(color, index));
    }

    private colorSpan(color: string, index: number) {
        $(`.accent span`).eq(index).css({ color: color });
    }

    private getWord() {
        let word;

        while (true) {
            let keyIndex = this.keys[this.randomIndex(this.keys.length)];
            word = this.notAnswered[keyIndex].pop();

            if (word !== undefined) {
                this.handleAnsweredWords(keyIndex, word);
                return word;
            }
        }
    }

    private handleAnsweredWords(keyIndex: string, word: WordI) {
        if (this.answered[keyIndex] === undefined) {
            this.answered[keyIndex] = [word];
            return;
        }
        this.answered[keyIndex].push(word);
    }

    private randomIndex(length: number) {
        return Math.floor(Math.random() * (length));
    }

    private wrapWordInSpan(word: string) {
        return word
            .split("")
            .map(character => `<span>${character}</span>`)
            .join("");
    }
}

export default Accent; 