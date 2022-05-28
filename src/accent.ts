import { accent, vowels } from './data/data';
import WordI from './Interfaces/wordI';
import WordsContainerI from './Interfaces/wordsContainerI';
import ParseString from './ParseString';
import Color from './colors';
import handleMovingSpan from './handleMovingSpan';
import handleStatisticsRendering from './handleStatisticsRendering';
import FormatWordWithSpan from './FormatWordWithSpan';
import $ = require('jquery');

class Accent {
    private currentWord: WordI = { word: "", mistakes: 0, answerd: 0, correctIndexes: [], extraInformation: "" };
    private allWords: WordI[] = [];

    constructor(
        private words = ParseString.parseAccent(accent),
        private answered: WordsContainerI = {},
        private keys = Object.keys(words),
        private notAnswered: WordsContainerI = {},
        private isUnique = true,
    ) {

        this.handleBtnClick();
        this.addWordList();
        this.shuffleWords(words);
        keys.forEach(letter => notAnswered[letter] = [...words[letter]]);

        this.allWords = Object.values(words).flatMap(words => words);

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
            handleStatisticsRendering(this.answered, this.notAnswered)
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

    private addWordList() {
        let wordList = $(".wordList");
        this.keys.forEach((key) => {
            wordList.append(`<h1 class="letter">${key}</h1>`)

            this.words[key].forEach((word) => {
                wordList.append(`
                <div class="word" data-atr=${word.word.toLowerCase()}>
                    <h1>${FormatWordWithSpan.formatWordWithSpan(word)}</h1>
                </div>`);
            });
        });
    }

    private lockSpanClicking() {
        $(".accent span").off("click");
    }

    private handleAddWord() {
        $(".accent").empty().append(FormatWordWithSpan.wrapWordInSpan(this.currentWord.word.toLowerCase()));
        $(".extraInfo").empty().append(this.currentWord.extraInformation);
    }

    private handleSpanClick() {
        let word = this.currentWord;
        $(".accent span").each((spanIndex, span) => {
            $(span).click(() => {
                if (!vowels.includes($(span).text()))
                    return;

                let isCorrect = word.correctIndexes.includes(spanIndex);
                if (!isCorrect) {
                    this.colorSpan(Color.error, spanIndex);
                    setTimeout(() => { this.start() }, 2000);
                    this.addToHistoryList();
                    word.mistakes++;
                } else
                    setTimeout(() => { this.start() }, 500);

                word.answerd++;
                this.colorAllSpan(Color.main);
                this.lockSpanClicking();
            });
        });
    }

    private addToHistoryList() {
        $(".history div").append(`<h2 class="word">${FormatWordWithSpan.formatWordWithSpan(this.currentWord)}</h2>`)
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

        if (keys.length === 0)
            return { word: "Well done", answerd: 0, mistakes: 0, correctIndexes: [4], extraInformation: "change mode to all words and hit the next button" };

        while (true) {
            let keyIndex = keys[this.randomIndex(keys.length)];
            word = words[keyIndex].pop();

            if (words[keyIndex].length === 0)
                delete words[keyIndex];


            if (word !== undefined) {
                this.handleAnsweredWords(keyIndex, word);
                return word;
            }

        }
    }

    private getWord(): WordI {
        const index = this.randomIndex(this.allWords.length);
        const word = this.allWords[index]

        this.handleAnsweredWords("allWords", word);

        return word;
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

    private shuffleArray(array: WordI[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    private randomIndex(length: number) {
        return Math.floor(Math.random() * (length));
    }
}

export default Accent; 