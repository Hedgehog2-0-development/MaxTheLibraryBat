// Purpose: Git management

const {existsSync, readFileSync} = require("fs")

const Path = require("./path")

module.exports.getLastCommitHash = () => {
    if (!existsSync(`${Path.getRootDirectory()}/.git`))
        return "<.git folder does not exist>"

    const head = readFileSync(`${Path.getRootDirectory()}/.git/HEAD`).toString().trim()

    return head.includes(":") ? readFileSync(`${Path.getRootDirectory()}/.git/${head.substring(5)}`).toString().trim() : head
}

module.exports.getLastCommitTitle = () => {
    if (!existsSync(`${Path.getRootDirectory()}/.git`))
        return "<.git folder does not exist>"

    const headLogsArray = readFileSync(`${Path.getRootDirectory()}/.git/logs/HEAD`).toString().split("\n").filter(string => string.length !== 0)
    const lastCommit = headLogsArray[headLogsArray.length - 1]

    return lastCommit.substring(lastCommit.indexOf(":") + 2)
}
