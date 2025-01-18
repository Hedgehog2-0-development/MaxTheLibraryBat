//
// Copyright (c) 2024, Hedgehog Team.    All rights reserved.
//

// Purpose: Sleep test

const sleep = require("../sleep")

async function main() {
    console.log("Sleeping for 10 seconds")
    await sleep(10000)
}

main()