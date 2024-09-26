// Purpose: Internal test functions

// NOTE(kratcy): This shouldn't be used randomly in projects. This is expected to be used in test files.

const {inspect} = require("util")

if (require.main === module) {
    console.error("This is a utility file, and isn't intended to be ran directly")
    process.exit(1)
}

let tests = 0
let successes = 0

const assertInternal = (expected, allowErrors, checkFunction, passedFunction, ...passedArguments) => {
    tests++

    let result
    
    {
        let functionResult

        {
            try {
                functionResult = passedFunction.call(...passedArguments)
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
 * @param {(...arguments: *) => *}passedFunction
 * @param {*} passedArguments
 */
module.exports.assertMustEqual = (expected, passedFunction, ...passedArguments) => assertInternal(expected, false, (result, expected) => [result === expected, inspect(result === expected), true], passedFunction, ...passedArguments)

/**
 * @param {*} expected
 * @param {(...arguments: *) => *}passedFunction
 * @param {*} passedArguments
 */
module.exports.assertMustNotEqual = (expected, passedFunction, ...passedArguments) => assertInternal(expected, false, (result, expected) => [result !== expected, inspect(result !== expected), false], passedFunction, ...passedArguments)

/**
 * @param {(...arguments: *) => *}passedFunction
 * @param {*} passedArguments
 */
module.exports.assertTruthy = (passedFunction, ...passedArguments) => module.exports.assertMustEqual(true, passedFunction, ...passedArguments)

/**
 * @param {(...arguments: *) => *}passedFunction
 * @param {*} passedArguments
 */
module.exports.assertFalsy = (passedFunction, ...passedArguments) => module.exports.assertMustEqual(false, passedFunction, ...passedArguments)

/**
 * @param {(...arguments: *) => *}passedFunction
 * @param {*} passedArguments
 */
module.exports.assertIsEmpty = (passedFunction, ...passedArguments) => assertInternal(false, false, isEmptyInternal, passedFunction, ...passedArguments)

/**
 * @param {(...arguments: *) => *}passedFunction
 * @param {*} passedArguments
 */
module.exports.assertIsNotEmpty = (passedFunction, ...passedArguments) => assertInternal(true, false, isEmptyInternal, passedFunction, ...passedArguments)

/**
 * @param {"undefined" | "object" | "boolean" | "number" | "string" | "function" | "symbol" | "bigint"} expected
 * @param {(...arguments: *) => *}passedFunction
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