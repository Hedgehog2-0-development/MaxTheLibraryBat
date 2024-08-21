// Purpose: Packet data helper

const Logger = require("../logger")

class PacketData {
    constructor(data) {
        this.data = data
    }

    /*
     * @param {string} key
     * @param {"string"|"object"|"number"|"boolean"|null} ensuredType
     * @returns {*|null}
     */
    get(key, ensuredType) {
        if (this.data[key] == null) {
            if (ensuredType != null)
                throw new Error(`Missing data: ${key}`)

            return null
        }

        if (ensuredType != null && typeof this.data[key] !== ensuredType)
            throw new Error(`Invalid data type: ${typeof this.data[key]} != ${ensuredType}`)

        return this.data[key]
    }
}

module.exports = PacketData