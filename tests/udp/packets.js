//
// Copyright (c) 2024, Hedgehog Team.    All rights reserved.
//

// Purpose: UDP packets test

const Test = require("../test")
const Packets = require("../../udp/packets")
const Cryptography = require("../../cryptography")

const password = "no, i will not put the real password here"

const fakeModule = {
    parse: packet => {
        const result = Packets.parse(id => id === 1n ? {} : null, packet, password, 100n, 100n)

        if (!result.message)
            return {}

        throw new Error()
    }
}

Test.assertThrowsError(fakeModule, "parse", "very valid json here")
Test.assertThrowsError(fakeModule, "parse", Packets.create(password, null, null))
Test.assertThrowsError(fakeModule, "parse", Packets.create(password, false, null))
Test.assertThrowsError(fakeModule, "parse", Packets.create(password, false, false))
Test.assertThrowsError(fakeModule, "parse", Packets.create(password, "false", false))
Test.assertThrowsError(fakeModule, "parse", Packets.create(password, "false", {}))
Test.assertThrowsError(fakeModule, "parse", Packets.create(password, 0n, {}))
Test.assertThrowsError(fakeModule, "parse", Packets.create("wrong", 1n, {}))
Test.assertDoesntThrowError(fakeModule, "parse", Packets.create(password, 1n, {}))