//
// Copyright (c) 2024, Hedgehog Team.    All rights reserved.
//

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