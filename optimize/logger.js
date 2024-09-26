// Purpose: Logger optimize test

const Optimize = require("./optimize")
const Logger = require("../logger")

// HACK(krtacy): First call to logger will always be the most laggy, since it has to initialize
//               However, if you call a disabled log type, then it wouldn't initialize
//               So we have to do this crap
for (let i = 0; i <= 1; i++) {
    Optimize.checkSpeed(Logger, "trace", "Hello, World!")
    Optimize.checkSpeed(Logger, "debug", "Hello, World!")
    Optimize.checkSpeed(Logger, "info", "Hello, World!")
    Optimize.checkSpeed(Logger, "warn", "Hello, World!")
    Optimize.checkSpeed(Logger, "error", "Hello, World!")
    Optimize.checkSpeed(Logger, "fatal", "Hello, World!")
}

Optimize.checkSpeed(Logger, "getLevel")