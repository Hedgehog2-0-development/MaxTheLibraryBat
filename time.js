// Purpose: Time based functions

/**
 * The string can have a suffix. If the string does not, then it treats it as seconds. Invalid suffixes will be ignored
 * Suffixes:
 * ms - Milliseconds
 * s - Seconds
 * m - Minutes
 * h - Hours
 * d - Days
 * mm - Months
 * y - Years
 * dd - Decades
 * c - Centuries
 * mmm - Millenniums
 * You can also combine multiple ones together
 * Example: 1h1s - 1 hour, 1 second
 *
 * @param {string} timeString
 * @returns {number}
 */
module.exports.convertStringToMilliseconds = timeString => {
    let finalTime = 0
    const timeStringSplit = timeString.split("")
    let numbers = []
    let loopedPart = 0
    let looped = ""
    let parsedNumber = 0

    for (let i = 0; i < timeStringSplit.length; i++) {
        const part = timeStringSplit[i]

        if (!isNaN(parseInt(part))) {
            numbers.push(part)
            continue
        }

        if (loopedPart === 0)
            parsedNumber = parseInt(numbers.join(""))

        if (isNaN(parsedNumber)) {
            loopedPart = 0
            looped = ""
            continue
        }

        if ((part === "m" || part === "d") && loopedPart !== 3) {
            loopedPart++
            looped = part

            if (i !== timeStringSplit.length - 1 && isNaN(parseInt(timeStringSplit[i + 1])))
                continue
        }

        switch (part) {
            case "m":
                if (looped === "m") {
                    if (loopedPart === 3) { // Millenniums
                        finalTime += parsedNumber * 31540000000000
                        break
                    }

                    if (loopedPart === 2) { // Months
                        finalTime += parsedNumber * 2628000000
                        break
                    }
                }

                // Minutes
                finalTime += parsedNumber * 60000
                break

            default:
            case "s":
                if (looped === "m" && loopedPart === 1) { // Milliseconds
                    finalTime += parsedNumber
                    break
                }

                // Seconds
                finalTime += parsedNumber * 1000
                break

            case "h": finalTime += parsedNumber * 3600000; break // Hours

            case "d":
                if (looped === "d" && loopedPart === 2) { // Decades
                    finalTime += parsedNumber * 315400000000
                    break
                }

                // Days
                finalTime += parsedNumber * 86400000
                break

            case "y": finalTime += parsedNumber * 31540000000; break // Years
            case "c": finalTime += parsedNumber * 3154000000000; break // Centuries
        }

        loopedPart = 0
        looped = ""
        numbers = []
    }

    if (numbers.length !== 0 && !isNaN(parseInt(numbers.join(""))))
        finalTime += parseInt(numbers.join("")) * 1000

    return finalTime
}