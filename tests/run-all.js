// Purpose: Run all tests

const {execSync} = require("child_process")

module.exports = directory => {
    const run = path => {
        execSync(`node ${directory}/${path}`, {
            detached: false,
            stdio: "inherit"
        })
    }

    run("udp/packet-data.js")
    run("udp/packets.js")
    run("bitwise.js")
    run("command-line-arguments.js")
    run("git.js")
    run("logger.js")
    run("parser.js")
    run("sleep.js")
    run("time.js")
}

if (require.main === module)
    module.exports(__dirname)