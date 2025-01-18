//
// Copyright (c) 2024, Hedgehog Team.    All rights reserved.
//

// Purpose: Simple wrapper around the crypto package

const {createHash, randomBytes, createCipheriv, createDecipheriv} = require("crypto")

const hashPassword = password => createHash("sha256").update(password).digest("base64").substring(0, 32)

module.exports.encrypt = (text, password) => {
    const initializationVector = randomBytes(16)
    const cipher = createCipheriv("aes-256-gcm", hashPassword(password), initializationVector)
    const encryption1 = cipher.update(text, "utf-8")
    const encryption2 = cipher.final()

    return Buffer.concat([initializationVector, cipher.getAuthTag(), encryption1, encryption2]).toString("base64")
}

/**
 * @throws Error - Incorrect initialization vector, tag, or password. The encrypted data could also be corrupted
 * @param encrypted
 * @param password
 * @returns {string}
 */
module.exports.decrypt = (encrypted, password) => {
    const buffer = Buffer.from(encrypted, "base64")
    const decipher = createDecipheriv("aes-256-gcm", hashPassword(password), buffer.subarray(0, 16))

    decipher.setAuthTag(buffer.subarray(16, 32))
    return decipher.update(buffer.subarray(32), null, "utf-8") + decipher.final("utf-8")
}