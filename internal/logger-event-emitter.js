// Purpose: Logger events emitter

const {TypedEmitter} = require("tiny-typed-emitter")

const Logger = require("../logger")

// TODO(kratcy): Oddly enough, this doesn't work with WebStorm. Either wait for them to fix it, or find a different solution
/**
 * @extends {TypedEmitter<{
 *     "messageLogged": (logLevel: Logger.ValidTypes, message: string, rawMessage: string) => void
 *     "logFileModified": (message: string) => void
 * }>}
 */
class LoggerEventEmitter extends TypedEmitter {
    constructor() {
        super()
    }
}

module.exports = LoggerEventEmitter