// Purpose: Logging system

const {createWriteStream} = require("fs")
const {clearLine, cursorTo} = require("readline")

const CommandLineArguments = require("./command-line-arguments")
const BuiltInArguments = require("./built-in-arguments")
const Path = require("./path")
const LoggerEventEmitter = require("./internal/logger-event-emitter")

const ValidTypes = {
    Fatal: 0,
    Error: 1,
    Warn: 2,
    Info: 3,
    Debug: 4,
    Trace: 5,
    Null: 6
}

const events = new LoggerEventEmitter()

let logLevel = null
let calledLogger = false
let crashed = false
let fileConsole = null

const formatDate = (dateSeparator) => {
    const date = new Date()

    const formatTime = time => {
        return time < 10 ? `0${time}` : time
    }

    return `${date.getMonth() + 1}${dateSeparator}${formatTime(date.getDay())}${dateSeparator}${date.getFullYear()} @ ${formatTime(date.getHours())}${formatTime(date.getMinutes())}${formatTime(date.getSeconds())}`
}

module.exports.ValidTypes = ValidTypes

/**
 * @param level
 * @param message
 * @param extra
 */
module.exports.log = (level, message, ...extra) => {
    if (calledLogger) {
        if (crashed)
            return

        crashed = true

        // Avoid being caught by `try ... catch ...`, this should never *ever* happen
        setTimeout(function() {
            throw new Error("Called logger twice, this should never happen")
        })

        return
    }

    if (!module.exports.isLevelEnabled(level))
        return

    calledLogger = true

    let outputFunction = console.log
    let header = ""
    let color = ""
    
    clearLine(process.stdout, 0)
    cursorTo(process.stdout, 0)

    if (!CommandLineArguments.hasArgument(BuiltInArguments.dontLogHeader, BuiltInArguments.dontLogHeaderShort)) {
        switch (level) {
            case ValidTypes.Trace:
                header = "[TRC] "
                color = "\033[1;34m"
                break

            case ValidTypes.Debug:
                header = "[DBG] "
                color = "\033[1;35m"
                break

            case ValidTypes.Info:
                header = "[INF] "
                color = "\033[1;36m"
                break

            case ValidTypes.Warn:
                outputFunction = console.warn
                header = "[WRN] "
                color = "\033[1;33m"
                break

            case ValidTypes.Error:
                outputFunction = console.error
                header = "[ERR] "
                color = "\033[1;31m"
                break

            case ValidTypes.Fatal:
                outputFunction = console.error
                header = "[FTL] "
                color = "\033[1m\033[1;31m"
                break

            default: header = "[UNK] "
        }
    }

    const originalHeader = header

    if (!CommandLineArguments.hasArgument(BuiltInArguments.disableAnsiColoring, BuiltInArguments.disableAnsiColoringShort))
        header = color + header + "\033[m"
    
    outputFunction(header + message, ...extra)

    {
        let eventMessage = message

        if (extra.length !== 0)
            eventMessage += ` ${extra.join(" ")}`

        events.emit("messageLogged", logLevel, header + eventMessage, originalHeader + eventMessage)
    }

    module.exports.addToLogFile(originalHeader + message, ...extra)

    calledLogger = false
}

module.exports.getLevel = () => {
    if (logLevel == null) {
        const logLevelType = CommandLineArguments.getValue(BuiltInArguments.logLevel, BuiltInArguments.logLevelShort)

        if (logLevelType != null) {
            switch (logLevelType.toLowerCase()) {
                case "trace": case "trc": logLevel = ValidTypes.Trace; break
                case "debug": case "dbg": logLevel = ValidTypes.Debug; break
                case "info": case "inf": logLevel = ValidTypes.Info; break
                case "warn": case "wrn": logLevel = ValidTypes.Warn; break
                case "error": case "err": logLevel = ValidTypes.Error; break
                case "fatal": case "ftl": logLevel = ValidTypes.Fatal; break
                case "null": case "none": logLevel = ValidTypes.Null; break
                default: console.error(`Invalid logger type: ${logLevelType}`)
            }
        }

        if (logLevel == null)
            logLevel = ValidTypes.Info
    }

    return logLevel
}

module.exports.trace = (message, ...extra) => {
    module.exports.log(ValidTypes.Trace, message, ...extra)
}

module.exports.debug = (message, ...extra) => {
    module.exports.log(ValidTypes.Debug, message, ...extra)
}

module.exports.info = (message, ...extra) => {
    module.exports.log(ValidTypes.Info, message, ...extra)
}

module.exports.warn = (message, ...extra) => {
    module.exports.log(ValidTypes.Warn, message, ...extra)
}

module.exports.error = (message, ...extra) => {
    module.exports.log(ValidTypes.Error, message, ...extra)
}

module.exports.fatal = (message, ...extra) => {
    module.exports.log(ValidTypes.Fatal, message, ...extra)
}

module.exports.setLevel = level => {
    logLevel = level
}

module.exports.addToLogFile = (message, ...extra) => {
    if (CommandLineArguments.hasValue(BuiltInArguments.disableLogFile, BuiltInArguments.disableLogFileShort) || Path.getRootDirectory() === "")
        return

    if (fileConsole == null)
        fileConsole = new console.Console(createWriteStream(`${Path.getRootDirectory()}/logs/${formatDate("")}.log`))

    const finalMessage = `(${formatDate("/")}) ${message}`
    
    {
        let eventMessage = finalMessage
        
        if (extra.length !== 0)
            eventMessage += ` ${extra.join(" ")}`
        
        events.emit("logFileModified", eventMessage)
    }
    
    fileConsole.log(finalMessage, ...extra)
}

module.exports.isLevelEnabled = level => module.exports.getLevel() !== ValidTypes.Null && level <= module.exports.getLevel()

module.exports.events = events