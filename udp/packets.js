//
// Copyright (c) 2024, Hedgehog Team.    All rights reserved.
//

// Purpose: Packets manager

const Cryptography = require("../cryptography")

let lastOneOopsPanic = false

/**
 * @param {(id: bigint) => any} packetFinder
 * @param {string} packet
 * @param {string} password
 * @param {bigint} oopsCode
 * @param {bigint} panicCode
 * @return {{message: string, error: null}|*|{message: string, error}}
 */
module.exports.parse = (packetFinder, packet, password, oopsCode, panicCode) => {
    let json

    try {
        json = JSON.parse(Cryptography.decrypt(packet, password))
    } catch (error) {
        return {
            message: "invalid JSON",
            error
        }
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
    return {
        foundPacket,
        data: json.d
    }
}

module.exports.create = (password, operationCode, data) => Cryptography.encrypt(JSON.stringify({
    "o": operationCode?.toString(),
    "d": data
}), password)