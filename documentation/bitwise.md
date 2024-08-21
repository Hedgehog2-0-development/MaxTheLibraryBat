# Creating a enumerator

Require `Bitwise` from `maxthelibrarybat/bitwise`, and call `createEnumerator`

It takes in an object. Each key will be an enumerator key, while the value will (almost) always be 0.

The function will then create the enumerator to work with bitwise math.

Any negative number will be set as-is. Allowing you to hardcode certain values.

Example:
```js
const Bitwise = require("maxthelibrarybat/bitwise")

module.exports = Bitwise.createEnumerator({
    Key1: 0, // 1
    Key2: 0, // 2
    Key3: 0, // 4
    Key4: 0, // 8
    Key5: 0, // 16
    Key6: 0, // 32
    Key7: 0, // 64
    
    HardcodedKey: -1 // -1
})
```