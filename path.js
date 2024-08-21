// Purpose: Main path management

let rootPath = ""

module.exports.setRootDirectory = path => {
    rootPath = path
}

module.exports.getRootDirectory = () => rootPath