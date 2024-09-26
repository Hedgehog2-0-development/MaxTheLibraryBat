// Purpose: Logger optimize test

const Optimize = require("./optimize")
const Logger = require("../logger")

// NOTE(krtacy): First call to logger will always be the most laggy, since it has to initialize
Optimize.checkSpeed("trace", null, Logger.trace, "Hello, World!")
Optimize.checkSpeed("trace", null, Logger.trace, "Hello, World!")
Optimize.checkSpeed("debug", null, Logger.debug, "Hello, World!")
Optimize.checkSpeed("info", null, Logger.info, "Hello, World!")
Optimize.checkSpeed("warn", null, Logger.warn, "Hello, World!")
Optimize.checkSpeed("error", null, Logger.error, "Hello, World!")
Optimize.checkSpeed("fatal", null, Logger.fatal, "Hello, World!")
Optimize.checkSpeed("getLevel", null, Logger.getLevel)