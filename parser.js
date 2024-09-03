// Purpose: Parser for key-value pairs

const Time = require("./time")

class Parser {
    constructor(object) {
        this._object = object
    }

    /**
     * @param {string} key
     * @param {string?} defaultValue
     */
    getString(key, defaultValue) {
        return this._object[key] ?? defaultValue ?? ""
    }

    /**
     * @param {string} key
     * @param {number?} defaultValue
     */
    getFloat(key, defaultValue) {
        let result = this.getString(key, (defaultValue ?? 0).toString())

        if (result.toLowerCase() === "true")
            return 1
        else if (result.toLowerCase() === "false")
            return 0

        result = parseInt(result)
        return !isNaN(result) ? result : (defaultValue ?? 0)
    }

    /**
     * @param {string} key
     * @param {number?} defaultValue
     */
    getInteger(key, defaultValue) {
        return Math.floor(this.getFloat(key, defaultValue))
    }

    /**
     * @param {string} key
     * @param {boolean?} defaultValue
     */
    getBoolean(key, defaultValue) {
        return this.getInteger(key, defaultValue ? 1 : 0) >= 1
    }

    /**
     * 
     * @param {string} key
     * @param {string?} defaultValue
     * @return {number}
     */
    getTimeMilliseconds(key, defaultValue) {
        return Time.convertStringToMilliseconds(this.getString(key, defaultValue))
    }

    /**
     * @param {string} key
     * @return {boolean}
     */
    exists(key) {
        return this._object[key] != null
    }

    /**
     * @param {string} key
     * @return {boolean}
     */
    isNumber(key) {
        return this.exists(key) && !isNaN(this.getString(key))
    }
}

module.exports = Parser