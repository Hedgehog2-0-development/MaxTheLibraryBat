// Purpose: HTTP query manager

const {InstanceType, Request} = require("http")
const {parse} = require("querystring")

const Parser = require("../parser")

class Query extends Parser {
    /**
     * @param {InstanceType<Request>} request
     */
    constructor(request) {
        super({})
        
        this._request = request
    }
    
    parse() {
        return new Promise(resolve => {
            const urlParameters = new URL(`http://localhost/${this._request.url}`).searchParams

            for (const key of urlParameters.keys())
                this._object[key] = urlParameters.get(key)
            
            if (this._request.method !== "post") {
                resolve(true)
                return
            }
            
            let receivedData = ""
            
            this._request.on("data", data => {
                receivedData += data
                
                if (receivedData.length <= 1e6)
                    return
                
                this._request.connection.destroy()
                resolve(false)
            })
            
            this._request.on("end", () => {
                const parsed = parse(receivedData)
                
                for (const key in parsed)
                    this._object[key] = parsed[key]
                
                resolve(true)
            })
        })
    }
}