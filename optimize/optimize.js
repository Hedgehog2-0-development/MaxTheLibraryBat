// Purpose: Internal optimize function

const {performance} = require("perf_hooks")
const {inspect} = require("util")

if (require.main === module) {
    console.error("This is a utility file, and isn't intended to be ran directly")
    process.exit(1)
}

global.Optimize = module.exports

// NOTE(kratcy): Yes, I required test here. Wanna fight about it?
module.exports.test = require("../tests/test")

const AsyncFunction = async function () {}.constructor

module.exports.checkSpeed = async (that, passedFunction, ...passedArguments) => {
    const now = performance.now()
    
    try {
        const newThat = {
            that,
            passedArguments
        }

        await (new AsyncFunction(...Object.keys(newThat), `await that.${passedFunction}.call(that, ...passedArguments)`))(...Object.values(newThat))
    } catch {
        // NOTE(kratcy): Intentionally ignored. This is just to test speed, not actually test if a function works
    }
    
    const finalTime = performance.now() - now
    
    {
        let stringedArguments = ""

        for (const passedArgument of passedArguments)
            stringedArguments += `${inspect(passedArgument).replace(/ +/g, " ").replaceAll("\n", "")}, `

        console.log(`${passedFunction}(${stringedArguments.substring(0, stringedArguments.length - 2)}) took ~${finalTime / 1000} seconds (${finalTime}ms)`)
    }
}
