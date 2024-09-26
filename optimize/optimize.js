// Purpose: Internal optimize function

const {performance} = require("perf_hooks")
const {inspect} = require("util");

// NOTE(kratcy): Yes, I required test here. Wanna fight about it?
module.exports.test = require("../tests/test")

module.exports.checkSpeed = (name, that, passedFunction, ...passedArguments) => {
    const now = performance.now()

    passedFunction.call(that, ...passedArguments)
    
    const finalTime = performance.now() - now
    
    {
        let stringedArguments = ""

        for (const passedArgument of passedArguments)
            stringedArguments += `${inspect(passedArgument).replace(/ +/g, " ").replaceAll("\n", "")}, `

        console.log(`${name}(${stringedArguments.substring(0, stringedArguments.length - 2)}) took ~${finalTime / 1000} seconds (${finalTime}ms)`)
    }
}