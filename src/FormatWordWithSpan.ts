import WordI from "./Interfaces/wordI";

export default class FormatWordWithSpan {

    public static formatWordWithSpan(word: WordI) {
        let formatedWord = word.word.split("")
            .map(letter => {
                return (letter.toLocaleUpperCase() === letter && letter !== "’") ?
                    `${FormatWordWithSpan.wrapWordInSpan(letter.toLowerCase())}` :
                    letter;
            }).join("");


        return `${formatedWord}`
    }

    public static wrapWordInSpan(word: string) {
        return word
            .split("")
            .map(character => `<span>${character}</span>`)
            .join("");
    }
}
