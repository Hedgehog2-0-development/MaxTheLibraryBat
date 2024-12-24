# Safety tips

1. Make sure the password is long. The longer it is, the more secure it can be
2. Avoid using words from the dictionary. Cracking software can easily reverse the password
3. Just replacing random letters with numbers, and vice versa, is NOT good security. It's not the 90's anymore, cracking 
software knows about this trick
4. Same with capitalizing random letters/numbers
5. Obviously, don't use a common password
6. Obviously, don't share the password, either
7. Don't use the same password you used anywhere else
8. If you need to send the encrypted message to a server, then add the password directly to the server, instead of passing 
the password with the message

# Encrypting data

Require `Cryptography` from `maxthelibrarybat/cryptography`, and call `encrypt`

Pass in the message you want to encrypt, and the password you want to use.

Example:

```js
const Cryptography = require("maxthelibrarybat/cryptography")

Cryptography.encrypt("Hello, World!", "password")
```

# Decrypting data

Call `decrypt`, and pass in the encrypted data, and the correct password. If it is the right password, it should return 
the original message, if not, then it would throw an error.

Example:

```js
const Cryptography = require("maxthelibrarybat/cryptography")

const encrypted = Cryptography.encrypt("Hello, World!", "password")

console.log(`Encrypted: ${encrypted}`) // Encrypted: <big base64 blob>

const decrypted = Cryptography.decrypt(encrypted, "password")

console.log(`Decrypted: ${decrypted}`) // Decrypted: Hello, World!
```