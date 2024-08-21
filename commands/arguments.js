// Purpose: Parsing, and managing, command arguments

module.exports.Classic = {}
module.exports.check = (commandArguments, userArguments) => {
    const missingArguments = []

    for (const index in commandArguments) {
        const argument = commandArguments[index]

        if (!argument.startsWith("<"))
            break

        if (userArguments[index])
            continue

        missingArguments.push(argument)
    }

    return missingArguments
}

/**
 * @param {string} userArguments
 * @returns {string[]}
 */
module.exports.parse = userArguments => {
    let finalArguments = []
    let quoteType = ""
    let escaped = false
    let temporaryArgument = ""

    for (const key of userArguments.split("")) {
        if ((key === '"' || key === "'") && !escaped) {
            if (quoteType !== "") {
                if (quoteType !== key) {
                    temporaryArgument += key
                    continue
                }

                finalArguments.push(temporaryArgument)

                temporaryArgument = ""
                quoteType = ""
                continue
            }

            quoteType = key
            continue
        }

        if (key === "\\") {
            if (escaped) {
                temporaryArgument += "\\"
                escaped = false
                continue
            }

            escaped = true
            continue
        }

        if (key === " ") {
            if (quoteType !== "" || escaped) {
                escaped = false
                temporaryArgument += " "
                continue
            }

            finalArguments.push(temporaryArgument)

            temporaryArgument = ""
            continue
        }

        // TODO(bacon): Should we treat escaped normal character as errors?
        escaped = false
        temporaryArgument += key
    }

    if (temporaryArgument)
        finalArguments.push(temporaryArgument)

    return finalArguments
}

/**
 * Removes quote blocks from the code.
 *
 * @param {string} code - The code.
 * @param {string[]} lookFor - What code type is it.
 *
 * @returns {string} The sanitized code.
 */
module.exports.Classic.removeQuoteBlock = (code, lookFor) => {
    let finalCode = code.substring(code.split("").indexOf("`"))

    for (const key of lookFor)
        finalCode = finalCode.replace(new RegExp(`\`\`\`${key}`, "g"), "").replace(/```/g, "")

    return finalCode
}