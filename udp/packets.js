// Purpose: Packets manager

let lastOneOopsPanic = false

/**
 * @param information
 * @param {(id: bigint) => any} packetFinder
 * @param {string} packet
 * @param {string} password
 * @param {bigint} oopsCode
 * @param {bigint} panicCode
 * @return {{message: string, error: null}|*|{message: string, error}}
 */
module.exports.parse = (information, packetFinder, packet, password, oopsCode, panicCode) => {
    let json

    try {
        json = JSON.parse(packet)
    } catch (error) {
        return {
            message: "invalid JSON",
            error
        }
    }

    if (json.p == null || json.p !== password)
        return {
            message: "wrong password",
            error: null
        }

    if (json.o == null || json.d == null)
        return {
            message: "missing information",
            error: null
        }

    if (typeof json.o !== "string" || typeof json.d !== "object")
        return {
            message: "wrong data types",
            error: null
        }
    
    let id

    try {
        id = BigInt(json.o)
    } catch (error) {
        return {
            message: "failed to parse ID",
            error
        }
    }

    let foundPacket = packetFinder(id)
    
    if (foundPacket == null)
        return {
            message: `ID ${json.o} not registered`,
            error: null
        }

    const currentOneOopsPanic = foundPacket.id === oopsCode || foundPacket.id === panicCode

    if (currentOneOopsPanic && lastOneOopsPanic)
        return {
            message: "Oops/panic loop detected",
            error: null
        }

    lastOneOopsPanic = currentOneOopsPanic
    return foundPacket
}