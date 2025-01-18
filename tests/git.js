//
// Copyright (c) 2024, Hedgehog Team.    All rights reserved.
//

// Purpose: git test

const git = require("../git")
const Path = require("../path")

Path.setRootDirectory(`${__dirname}/../`)

console.log(`(${git.getLastCommitHash()}): ${git.getLastCommitTitle()}`)