// Purpose: UDP packets test

const Test = require("../test")
const Packets = require("../../udp/packets")

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
Test.assertThrowsError(fakeModule, "parse", JSON.stringify({}))
Test.assertThrowsError(fakeModule, "parse", JSON.stringify({
    p: "wrong password"
}))
Test.assertThrowsError(fakeModule, "parse", JSON.stringify({
    p: password
}))
Test.assertThrowsError(fakeModule, "parse", JSON.stringify({
    p: password,
    o: false
}))
Test.assertThrowsError(fakeModule, "parse", JSON.stringify({
    p: password,
    o: false,
    d: false
}))
Test.assertThrowsError(fakeModule, "parse", JSON.stringify({
    p: password,
    o: "false",
    d: false
}))
Test.assertThrowsError(fakeModule, "parse", JSON.stringify({
    p: password,
    o: "false",
    d: {}
}))
Test.assertThrowsError(fakeModule, "parse", JSON.stringify({
    p: password,
    o: "0",
    d: {}
}))
Test.assertDoesntThrowError(fakeModule, "parse", JSON.stringify({
    p: password,
    o: "1",
    d: {}
}))