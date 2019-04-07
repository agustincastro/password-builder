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
        this.length = length;
        return this;
    }

    letters(letters) {
        this.letters = letters;
        if (letters.length === 0) {
            this.conditions[letters] = true;
            this.conditionsToCheck -= 1;
        }
        return this;
    }

    numbers(numbers) {
        this.numbers = numbers;
        if (numbers.length === 0) {
            this.conditions[numbers] = true;
            this.conditionsToCheck -= 1;
        }
        return this;
    }

    symbols(symbols) {
        this.symbols = symbols;
        if (symbols.length === 0) {
            this.conditions[symbols] = true;
            this.conditionsToCheck -= 1;
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

const test = pb.setLength(10).generate();

console.log(test);

