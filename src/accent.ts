import { accent } from './data/data';
import WordI from './Interfaces/wordI';
import WordsContainerI from './Interfaces/wordsContainerI';
import ParseString from './ParseString';
import Color from './colors';
import handleMovingSpan from './handleMovingSpan';
import $ = require('jquery');

class Accent {
    private currentWord: WordI = { word: "", mistakes: 0, answerd: 0, correctIndexes: [], extraInformation: "" };

    constructor(
        readonly words = ParseString.parseAccent(accent),
        readonly answered: WordsContainerI = {},
        private keys = Object.keys(words),
        readonly notAnswered: WordsContainerI = {},
        private isUnique = true,
    ) {

        this.handleBtnClick();
        this.addStatistics();
        this.shuffleWords(words);
        keys.forEach(letter => notAnswered[letter] = [...words[letter]]);
        this.start();
    }


    private start() {
        if (this.isUnique)
            this.currentWord = this.getUniqueWord();
        else
            this.currentWord = this.getWord();
        this.handleAddWord()
        this.handleSpanClick();
        handleMovingSpan();
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
            alert("handle It")
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

        $(".menu input").change(() => {
            this.isUnique = !this.isUnique;
        });
    }

    private addStatistics() {
        this.keys.forEach((key) => {
            this.words[key].forEach((word) => {
                $(".statistics").append(`
                <div class="word" data-atr=${word.word.toLowerCase()}>
                    <h1>${this.formatWordWithSpan(word)}</h1>
                </div>`);
            });
        });
    }

    private lockSpanClicking() {
        $(".accent span").off("click");
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

    private getUniqueWord() {
        let words = this.notAnswered;
        let word;
        let keys = Object.keys(words);

        while (true) {
            let keyIndex = keys[this.randomIndex(keys.length)];
            word = words[keyIndex].pop();

            if (words[keyIndex].length === 0) {
                console.log(words)

                delete words[keyIndex];
            }

            if (word !== undefined) {
                this.handleAnsweredWords(keyIndex, word);
                return word;
            }

        }
    }

    private getWord(): WordI {
        let keys = Object.keys(this.words);
        let words = this.words;

        let letter = keys[this.randomIndex(keys.length)];
        let index = this.randomIndex(words[letter].length);

        return words[letter].at(index) ?? { word: "no words :C", mistakes: 0, answerd: 0, correctIndexes: [9], extraInformation: "press new word" };
    }

    private handleAnsweredWords(keyIndex: string, word: WordI) {
        if (this.answered[keyIndex] === undefined) {
            this.answered[keyIndex] = [word];
            return;
        }
        this.answered[keyIndex].push(word);
    }

    private shuffleWords(words: WordsContainerI) {
        Object.keys(words).forEach((letter) => {
            for (let i = 0; i < 10; i++)
                this.shuffleArray(words[letter]);
        });

    }
    shuffleArray(array: WordI[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
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