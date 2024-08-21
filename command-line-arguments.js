// Purpose: Make managing the command line arguments easier

/**
 * @param {string} argumentName
 * @param {string} [shortenName]
 * @return {boolean}
 */
module.exports.hasValue = (argumentName, shortenName) => {
    return module.exports.getValueIndex(argumentName, shortenName) !== -1
}

/**
 * @param {string} argumentName
 * @param {string} [shortenName]
 * @return {number}
 */
module.exports.getValueIndex = (argumentName, shortenName) => {
    if (shortenName != null) {
        const shortenIndex = process.argv.indexOf(shortenName)

        if (shortenIndex !== -1 && shortenIndex + 1 < process.argv.length)
            return shortenIndex + 1
    }

    const nameIndex = process.argv.indexOf(argumentName)

    return nameIndex !== -1 && nameIndex + 1 < process.argv.length ? nameIndex + 1 : -1
}

/**
 * @param {string} argumentName
 * @param {string} [shortenName]
 * @return {string|null}
 */
module.exports.getValue = (argumentName, shortenName) => {
    const index = module.exports.getValueIndex(argumentName, shortenName)

    return index !== -1 ? process.argv[index] : null
}

/**
 * @param {string} argumentName
 * @param {string} [shortenName]
 * @return {boolean}
 */
module.exports.hasArgument = (argumentName, shortenName) => {
    return process.argv.includes(argumentName) || (shortenName != null && process.argv.includes(shortenName))
}
