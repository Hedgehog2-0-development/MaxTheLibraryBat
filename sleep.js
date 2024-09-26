// Purpose: Sleep function

/**
 * @param {number} milliseconds
 * @return {Promise<void>}
 */
module.exports = milliseconds => {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds)
    })
}