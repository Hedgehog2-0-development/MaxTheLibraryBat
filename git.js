// Purpose: Git management

const {existsSync, readFileSync} = require("fs")

const Bot = require("./bot")

module.exports.getLastCommitHash = () => {
    if (!existsSync(`${Bot.getRootDirectory()}/.git`))
        return "<.git folder does not exist>"

    const head = readFileSync(`${Bot.getRootDirectory()}/.git/HEAD`).toString().trim()

    return head.includes(":") ? readFileSync(`${Bot.getRootDirectory()}/.git/${head.substring(5)}`).toString().trim() : head
}

module.exports.getLastCommitTitle = () => {
    if (!existsSync(`${Bot.getRootDirectory()}/.git`))
        return "<.git folder does not exist>"

    const headLogsArray = readFileSync(`${Bot.getRootDirectory()}/.git/logs/HEAD`).toString().split("\n").filter(string => string.length !== 0)
    const lastCommit = headLogsArray[headLogsArray.length - 1]

    return lastCommit.substring(lastCommit.indexOf(":") + 2)
}
