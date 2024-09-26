// Purpose: Sleep optimize test

const Optimize = require("./optimize")
const sleep = require("../sleep")

console.log("Sleeping for 10 seconds")
Optimize.checkSpeed("sleep", null, sleep, 10000)