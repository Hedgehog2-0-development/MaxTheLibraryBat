// Purpose: Internal test functions

// HACK(kratcy): This takes a lot of odd shortcuts. Why do I have to suck at writing test code?
// NOTE(kratcy): This shouldn't be used randomly in projects. This is expected to be used in test files.
// TODO(kratcy): These assert functions can be useful, though. Perhaps we can extract them from this file?
delete require.cache[require.resolve(__filename)]

const {inspect} = require("util")
const uniqueKey = "this is a unique key, but whats the chances someone has MAX_THE_LIBRARY_BAT_TEST_REQUIRED defined in their environment variables?" + 
                  "i dont know, but this is for you, random person." +
                  "also, please don't try circumventing this, since the whole point of this file is to allow making test files, not so you can use this in the bot." +
                  "thank you for understanding - kratcy" +
                  __filename // NOTE(kratcy): There is no way someone will both have `MAX_THE_LIBRARY_BAT_TEST_REQUIRED` defined, but also match this value. What's the fucking odds?

if (process.env.MAX_THE_LIBRARY_BAT_TEST_REQUIRED === uniqueKey) {
    const trace = new Error().stack.split("\n")

    trace.shift()
    
    console.error("Test has already been required. Do not require this twice\n" +
                  `Current require trace:\n${trace.join("\n")}\n` +
                  `Original require trace:\n${process.env.MAX_THE_LIBRARY_BAT_TEST_FIRST_CALL_TRACE}`)
    process.exit(1)
}

process.env.MAX_THE_LIBRARY_BAT_TEST_REQUIRED = uniqueKey

if (require.main === module) {
    console.error("This is a utility file, and isn't intended to be ran directly")
    process.exit(1)
}

{
    const trace = new Error().stack.split("\n")
    
    trace.shift()
    
    process.env.MAX_THE_LIBRARY_BAT_TEST_FIRST_CALL_TRACE = trace.join("\n")
}

delete require.cache[require.resolve(require.main.filename)]

let tests = 0
let successes = 0

const assertInternal = (expected, allowErrors, checkFunction, passedFunction, ...passedArguments) => {
    tests++

    let result
    
    {
        let functionResult

        {
            try {
                functionResult = passedFunction.call(null, ...passedArguments)
            } catch (error) {
                if (!allowErrors)
                    throw error
                
                functionResult = error
            }
        }

        result = checkFunction(functionResult, expected)
    }
    
    {
        let stringedArguments = ""
        
        for (const passedArgument of passedArguments)
            stringedArguments += `${inspect(passedArgument)}, `
        
        // FIXME(kratcy): passedFunction.name is empty for arrow functions
        console.log(`${passedFunction.name}(${stringedArguments.substring(0, stringedArguments.length - 2)}) ${!result[2] ? "!" : "="}= ${inspect(expected)}`)
    }
    
    if (result[0]) {
        successes++
        return
    }
    
    console.trace(`Got ${result[1]} instead`)
}

const isEmptyInternal = (result, expected) => {
    let finalResult = true
    let finalExpected = ""
    
    switch (typeof result) {
        case "string": finalResult = result === ""; break
        
        case "object":
            finalResult = (!Array.isArray(result) ? Object.keys(result) : result).length === 0
            finalExpected = Array.isArray(result) ? [] : {}
            break
        
        case "bigint":
            finalResult = result === 0n
            finalExpected = 0n
            break
        
        case "boolean":
            finalResult = result
            finalExpected = !expected
            break
        
        case "number":
            finalResult = result === 0
            finalExpected = 0
            break
        
        case "symbol":
            finalResult = result.toString() === "Result()"
            finalExpected = "Result()"
            break
    }
    
    return [finalResult === expected, inspect(finalExpected), true]
}

/**
 * @param {*} expected
 * @param {(...arguments: *) => *} passedFunction
 * @param {*} passedArguments
 */
module.exports.assertMustEqual = (expected, passedFunction, ...passedArguments) => assertInternal(expected, false, (result, expected) => [result === expected, inspect(result === expected), true], passedFunction, ...passedArguments)

/**
 * @param {*} expected
 * @param {(...arguments: *) => *} passedFunction
 * @param {*} passedArguments
 */
module.exports.assertMustNotEqual = (expected, passedFunction, ...passedArguments) => assertInternal(expected, false, (result, expected) => [result !== expected, inspect(result !== expected), false], passedFunction, ...passedArguments)

/**
 * @param {(...arguments: *) => *} passedFunction
 * @param {*} passedArguments
 */
module.exports.assertTruthy = (passedFunction, ...passedArguments) => module.exports.assertMustEqual(true, passedFunction, ...passedArguments)

/**
 * @param {(...arguments: *) => *} passedFunction
 * @param {*} passedArguments
 */
module.exports.assertFalsy = (passedFunction, ...passedArguments) => module.exports.assertMustEqual(false, passedFunction, ...passedArguments)

/**
 * @param {(...arguments: *) => *} passedFunction
 * @param {*} passedArguments
 */
module.exports.assertIsEmpty = (passedFunction, ...passedArguments) => assertInternal(false, false, isEmptyInternal, passedFunction, ...passedArguments)

/**
 * @param {(...arguments: *) => *} passedFunction
 * @param {*} passedArguments
 */
module.exports.assertIsNotEmpty = (passedFunction, ...passedArguments) => assertInternal(true, false, isEmptyInternal, passedFunction, ...passedArguments)

/**
 * @param {"undefined" | "object" | "boolean" | "number" | "string" | "function" | "symbol" | "bigint"} expected
 * @param {(...arguments: *) => *} passedFunction
 * @param {*} passedArguments
 */
module.exports.assertIsType = (expected, passedFunction, ...passedArguments) => assertInternal(expected, false, (result, expected) => [typeof result === expected, inspect(typeof result), true], passedFunction, ...passedArguments)

/**
 * @param {"undefined" | "object" | "boolean" | "number" | "string" | "function" | "symbol" | "bigint"} expected
 * @param {(...arguments: *) => *} passedFunction
 * @param {*} passedArguments
 */
module.exports.assertIsNotType = (expected, passedFunction, ...passedArguments) => assertInternal(expected, false, (result, expected) => [typeof result !== expected, inspect(typeof result), false], passedFunction, ...passedArguments)

// FIXME(kratcy): If the function returns an error, then it would say "error != error", which is confusing and dumb

/**
 * @param {(...arguments: *) => *} passedFunction
 * @param {*} passedArguments
 */
module.exports.assertThrowsError = (passedFunction, ...passedArguments) => assertInternal("error", true, (result, expected) => [result instanceof Error, inspect(result), true], passedFunction, ...passedArguments)

// TODO(kratcy): This masks the stack trace

/**
 * @param {(...arguments: *) => *} passedFunction
 * @param {*} passedArguments
 */
module.exports.assertDoesntThrowError = (passedFunction, ...passedArguments) => assertInternal("error", true, (result, expected) => [!(result instanceof Error), inspect(result.toString()), false], passedFunction, ...passedArguments)

/**
 * @param {(...arguments: *) => *} passedFunction
 * @param {*} passedArguments
 */
module.exports.assertIsArray = (passedFunction, ...passedArguments) => assertInternal("array", false, (result, expected) => [Array.isArray(result), inspect(result), true], passedFunction, ...passedArguments)

/**
 * @param {(...arguments: *) => *} passedFunction
 * @param {*} passedArguments
 */
module.exports.assertIsNotArray = (passedFunction, ...passedArguments) => assertInternal("array", false, (result, expected) => [!Array.isArray(result), inspect(result), true], passedFunction, ...passedArguments)

/**
 * @param {*} expected
 * @param {(...arguments: *) => *} passedFunction
 * @param {*} passedArguments
 */
module.exports.assertIsInstance = (expected, passedFunction, ...passedArguments) => assertInternal(expected, false, (result, expected) => [result instanceof expected, inspect(result), true], passedFunction, ...passedArguments)

process.on("uncaughtException", error => {
    console.error("Unexpected error:\n", error)
    console.error("Test has to end prematurely")
    process.exit(1)
})

process.on("beforeExit", () => {
    const percentage = successes / tests * 100
    
    console.log(`${!Number.isInteger(percentage) ? "~" : ""}${Math.floor(percentage)}% success (${successes}/${tests} tests)`) 
})