const crypto = require("crypto");


// Allow to configure using chaining pattern

// Allow to configure using config object


class PasswordBuilder {

    constructor() {
        this.length = 15;
        this.letters = "ABCDEFGHIJKLMNOPQRSTUVWXZY";
        this.numbers = "0123456789";
        this.symbols = "!@#$%^&*()";
        this.conditionsToCheck = 3;

        this.conditions = {
            letters: false,
            numbers: false,
            symbols: false
        };

        this.charType = {
            LETTER: "letters",
            NUMBER: "numbers",
            SYMBOL: "symbols"
        };
    }

    setLength(length) {
        // TODO: check validity
        this.length = length;
        return this;
    }

    setLetters(letters) {
        if (letters.length === 0 || !letters) {
            this.conditions[this.charType.LETTER] = true;
            this.conditionsToCheck -= 1;
            this.letters = "";
        }else{
            this.letters = letters;
        }
        return this;
    }

    setNumbers(numbers) {
        if (numbers.length === 0 || !numbers) {
            this.conditions[this.charType.NUMBER] = true;
            this.conditionsToCheck -= 1;
            this.numbers = ""
        }else{
            this.numbers = numbers;
        }
        return this;
    }

    setSymbols(symbols) {
        if (symbols.length === 0 || ! symbols) {
            this.conditions[this.charType.SYMBOL] = true;
            this.conditionsToCheck -= 1;
            this.symbols = "";
        }else{
            this.symbols = symbols;
        }
        return this;
    }

    _checkCondition(char) {

        const getCharType = (char) => {

            if (typeof char !== "string" || char.length !== 1) {
                throw new Error("Invalid char type");
            }

            if (this.letters.includes(char)) {
                return this.charType.LETTER;
            } else if (this.numbers.includes(char)) {
                return this.charType.NUMBER;
            } else if (this.symbols.includes(char)) {
                return this.charType.SYMBOL;
            } else {
                throw new Error("Unknown char type");
            }
        }

        const charType = getCharType(char);
        this.conditions[charType] = this.conditions[charType] || true;
    }



    generate() {

        const choices = this.letters + this.numbers + this.symbols;
        let generatedPassword = "";

        for (let i = 0; i < this.length; i++) {
            let selectedChar;
            const lastChars = this.length - i <= this.conditionsToCheck;
            if (lastChars && !this.conditions[this.charType.LETTER]) {
                // We are still missing a letter char and we are getting to the end
                const randomLetterChoice = Math.floor((Math.random() * (this.letters.length - 1)) + 0);
                selectedChar = this.letters[randomLetterChoice];
            }
            else if (lastChars && !this.conditions[this.charType.NUMBER]) {
                // We are still missing a number char and we are getting to the end
                const randomNumberChoice = Math.floor((Math.random() * (this.numbers.length - 1)) + 0);
                selectedChar = this.numbers[randomNumberChoice];
            }
            else if (lastChars && !this.conditions[this.charType.SYMBOL]) {
                // We are still missing a symbol char and we are getting to the end
                const randomSymbolChoice = Math.floor((Math.random() * (this.symbols.length - 1)) + 0);
                selectedChar = this.symbols[randomSymbolChoice];
            } else {
                const randomChoice = Math.floor((Math.random() * (choices.length - 1)) + 0);
                selectedChar = choices[randomChoice];
            }
            this._checkCondition(selectedChar);
            generatedPassword += selectedChar;
        }
        return generatedPassword;
    }
}

const pb = new PasswordBuilder();

const test = pb.setLength(10).setLetters("ABCDE").setNumbers(false).setSymbols(false).generate();

console.log(test);

module.exports = new PasswordBuilder();