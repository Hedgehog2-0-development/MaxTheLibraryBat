// Purpose: Cookie parser

module.exports.parse = cookies => {
    if (cookies == null)
        return {}
    
    const parsedCookies = {}
    
    for (const cookie of cookies.split(";")) {
        let cookieData = cookie.split("=")
        let name =  cookieData.shift()?.trim()
        let value = cookieData.join("=").trim()
        
        if (name == null || name === "" || value === "")
            continue
        
        parsedCookies[name] = decodeURIComponent(value)
    }
    
    return parsedCookies
}