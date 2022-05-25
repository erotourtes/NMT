import { WordsContainerI } from "./Interfaces/wordsContainerI"

class ParseString {

    public static parseAccent(str: string) {
        let words = str.split("\n");
        let currentLetter: string;
        let obj: WordsContainerI = {};

        words.forEach(word => {
            if (word === '') return;
            if (word.length === 1) {
                obj[word] = [];
                currentLetter = word;
                return;
            }

            let upperCaseIndex = word.search(/[А-ЯҐЄІЇ]/);
            obj[currentLetter].push({ word: word, mistakes: 0, answerd: 0, correctIndex: upperCaseIndex });

        });
        return obj;
    }
}

export { ParseString };