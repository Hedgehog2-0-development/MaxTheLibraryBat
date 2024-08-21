// Purpose: UDP packet

const PacketData = require("./packet-data")

class Packet {
    /**
     * @param {
     *     {
     *         id: bigint,
     *         action: (data: PacketData) => Promise<void>
     *     }
     * } options
     */
    constructor(options) {
        this.id = options.id
        this.action = options.action
    }
}

module.exports = Packet