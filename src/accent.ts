import { accent } from './data/data';
import { ParseString } from './ParseString'
import { WordsContainerI } from "./Interfaces/wordsContainerI"
import $ = require('jquery');
import { WordI } from './Interfaces/wordI';
import Color from './colors';

class Accent {
    private currentWord: WordI = { word: "", mistakes: 0, answerd: 0, correctIndex: 0 };

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
    }

    private handleBtnClick() {
        $(".menu .newBtn").click(() => this.start());

        $(".menu .correctBtn").click(() => {
            const word = this.currentWord;
            word.answerd++;
            word.mistakes++;
            this.colorSpan(Color.main, word.correctIndex);
        });

        $(".menu .statisticsBtn").click(() => {
            alert("handleIT");
        });
    }

    private handleAddWord() {
        $(".accent").empty().append(this.wrapWordInSpan(this.currentWord.word.toLowerCase()));
    }

    private handleSpanClick() {
        let word = this.currentWord;
        $(".accent span").each((spanIndex, span) => {
            $(span).click(() => {
                if (spanIndex !== word.correctIndex) {
                    this.colorSpan(Color.error, spanIndex);
                    setTimeout(() => { this.start() }, 2000);
                } else
                    setTimeout(() => { this.start() }, 500);
                this.colorSpan(Color.main, word.correctIndex);

            });
        });
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

export { Accent }