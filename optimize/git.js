// Purpose: git optimize test

const Optimize = require("./optimize")
const git = require("../git")
const Path = require("../path")

Path.setRootDirectory(__dirname)
Optimize.checkSpeed(git, "getLastCommitHash")
Optimize.checkSpeed(git, "getLastCommitTitle")
Path.setRootDirectory(`${__dirname}/../`)
Optimize.checkSpeed(git, "getLastCommitHash")
Optimize.checkSpeed(git, "getLastCommitTitle")