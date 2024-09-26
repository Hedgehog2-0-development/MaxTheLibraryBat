// Purpose: PacketData test

const Test = require("../test")
const PacketData = require("../../udp/packet-data")

const packetData = new PacketData({
    "exists": "test"
})

Test.assertThrowsError(packetData, "get", "doesntexist", "string")
Test.assertNull(packetData, "get", "doesntexist")
Test.assertThrowsError(packetData, "get", "exists", "number")
Test.assertThrowsError(packetData, "get", "exists", "number")
Test.assertDoesntThrowError(packetData, "get", "exists", "string")