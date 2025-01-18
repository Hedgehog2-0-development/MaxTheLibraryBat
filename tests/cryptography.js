//
// Copyright (c) 2024, Hedgehog Team.    All rights reserved.
//

// Purpose: Cryptography test

const Test = require("./test")
const Cryptography = require("../cryptography")

const encrypted = Cryptography.encrypt("Hello, World!", "password")

Test.assertMustEqual(Cryptography, "Hello, World!", "decrypt", encrypted, "password")
Test.assertThrowsError(Cryptography, "decrypt", encrypted, "wrong")