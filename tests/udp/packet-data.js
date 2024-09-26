// Purpose: PacketData test

const Test = require("../test")
const PacketData = require("../../udp/packet-data")

const packetData = new PacketData({
    "exists": "test"
})

Test.assertThrowsError(packetData, packetData.get, "doesntexist", "string")
Test.assertNull(packetData, packetData.get, "doesntexist")
Test.assertThrowsError(packetData, packetData.get, "exists", "number")
Test.assertThrowsError(packetData, packetData.get, "exists", "number")
Test.assertDoesntThrowError(packetData, packetData.get, "exists", "string")