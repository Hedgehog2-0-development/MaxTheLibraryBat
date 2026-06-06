//
// Copyright (c) 2025, Hedgehog Team.    All rights reserved.
//

// Purpose: OS user functions

const {platform} = require("os")
const {execSync} = require("child_process")

const Logger = require("./logger")

let alreadyWarned = false

module.exports.isAdmin = () => {
    if (platform() === "win32") {
        try {
            execSync("net session")
        } catch (error) {
            return false
        }

        return true
    } else if (process.getuid != null)
        return process.getuid() === 0
    else if (!alreadyWarned) {
        Logger.warn("Don't know how to detect if you're an admin")

        alreadyWarned = true
    }

    return false
}