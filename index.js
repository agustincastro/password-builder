const crypto = require("crypto");


// Allow to configure using chaining pattern

// Allow to configure using config object

const config = {
    length: 15,
    letters: "ABCD",
    numbers: "1234",
    symbols: "!@#$",
    lowerCase: true,
    upperCase: true
}


class PasswordBuilder{

    constructor(){
        this.length = 15;
        this.letters = "ABCDEFGHIJKLMNOPQRSTUVWXZY";
        this.numbers = "0123456789";
        this.symbols = "!@#$%^&*()";
    }

    setLength(length){
        this.length = length;
        return this;
    }

    letters(letters){
        this.letters = letters;
        return this;
    }

    numbers(numbers){
        this.numbers = numbers;
        return this;
    }

    symbols(symbols){
        this.symbols = symbols;
        return this;
    }

    generate(){

        const conditions = {
            letters: false,
            numbers: false,
            symbols: false
        }
        const choices = this.letters + this.numbers + this.symbols;
        let generatedPassword = "";
        for(let i=0; i< this.length-1; i++){
            const randomChoice = Math.floor((Math.random() * (choices.length - 1)) + 0);
            generatedPassword += choices[randomChoice];
        }
        return generatedPassword;
    }
}

const pb = new PasswordBuilder();

const test = pb.setLength(50).generate();

console.log(test);

