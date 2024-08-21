// Purpose: Bitwise math

module.exports.has = (flags, bit) => (flags & bit) === bit
module.exports.give = (flags, bit) => flags | bit
module.exports.remove = (flags, bit) => flags & ~bit
module.exports.toggle = (flags, bit) => !module.exports.has(flags, bit) ? module.exports.give(flags, bit) : module.exports.remove(flags, bit)

/**
 * Easier way to create a bitwise enumerator
 * @template T
 * @param {T} enumerator
 * @returns {Readonly<T>}
 */
module.exports.createEnumerator = enumerator => {
    let index = 0

    for (const name in enumerator) {
        if (enumerator[name] < 0)
            continue

        if (index <= 1)
            enumerator[name] = index
        else
            enumerator[name] = (1 << index)

        index++
    }

    return Object.freeze(enumerator)
}