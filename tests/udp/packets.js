// Purpose: UDP packets test

const Test = require("../test")
const Packets = require("../../udp/packets")

const password = "no, i will not put the real password here"

const parse = packet => {
    const result = Packets.parse(id => id === 1n ? {} : null, packet, password, 100n, 100n)
    
    if (!result.message)
        return {}

    throw new Error()
}

Test.assertThrowsError(null, parse, "very valid json here")
Test.assertThrowsError(null, parse, JSON.stringify({}))
Test.assertThrowsError(null, parse, JSON.stringify({
    p: "wrong password"
}))
Test.assertThrowsError(null, parse, JSON.stringify({
    p: password
}))
Test.assertThrowsError(null, parse, JSON.stringify({
    p: password,
    o: false
}))
Test.assertThrowsError(null, parse, JSON.stringify({
    p: password,
    o: false,
    d: false
}))
Test.assertThrowsError(null, parse, JSON.stringify({
    p: password,
    o: "false",
    d: false
}))
Test.assertThrowsError(null, parse, JSON.stringify({
    p: password,
    o: "false",
    d: {}
}))
Test.assertThrowsError(null, parse, JSON.stringify({
    p: password,
    o: "0",
    d: {}
}))
Test.assertDoesntThrowError(null, parse, JSON.stringify({
    p: password,
    o: "1",
    d: {}
}))