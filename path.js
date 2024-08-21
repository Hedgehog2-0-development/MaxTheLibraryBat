// Purpose: Main path management

let rootPath = ""

module.exports.setRoot = path => {
    rootPath = path
}

module.exports.getRoot = () => rootPath