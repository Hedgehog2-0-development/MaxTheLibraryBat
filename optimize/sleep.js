// Purpose: Sleep optimize test

const Optimize = require("./optimize")
const sleep = require("../sleep")

const fakeModule = {
    sleep
}

console.log("Sleeping for 10 seconds")
Optimize.checkSpeed(fakeModule, "sleep", 10000)