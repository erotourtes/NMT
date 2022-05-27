import WordsContainerI from "./Interfaces/wordsContainerI";

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

            // let upperCaseIndex = word.search(/[А-ЯҐЄІЇ]/g);
            const indexExtraInfo = word.search(/\(/);
            let justWord: string;
            let extraInformation: string;
            if (indexExtraInfo !== -1) {
                extraInformation = word.slice(indexExtraInfo);
                justWord = word.slice(0, indexExtraInfo - 1);

            } else {
                extraInformation = " ";
                justWord = word;
            }

            let upperCaseIndex = justWord
                .split("")
                .map((letter, index) => letter.toUpperCase() === letter && letter !== "’" ? index : -1)
                .filter(index => index !== -1);

            // console.log(justWord, upperCaseIndex, extraInformation)

            obj[currentLetter].push({ word: justWord, mistakes: 0, answerd: 0, correctIndexes: upperCaseIndex, extraInformation: extraInformation });
        });
        return obj;
    }
}

export default ParseString;