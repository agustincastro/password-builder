# password-builder
Node module for generating randomized passwords


Password can be configurated using a chaining pattern:

```javascript
const passwordBuilder = require("password-builder");

// Generate a password containing just the letters ABCDE without numbers or symbols and with a length of 10.
const password = passwordBuilder.setLength(10).setLetters("ABCDE").setNumbers(false).setSymbols(false).generate();
```