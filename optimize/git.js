// Purpose: git optimize test

const Optimize = require("./optimize")
const git = require("../git")
const Path = require("../path")

Path.setRootDirectory(__dirname)
Optimize.checkSpeed("getLastCommitHash", null, git.getLastCommitHash)
Optimize.checkSpeed("getLastCommitTitle", null, git.getLastCommitTitle)
Path.setRootDirectory(`${__dirname}/../`)
Optimize.checkSpeed("getLastCommitHash", null, git.getLastCommitHash)
Optimize.checkSpeed("getLastCommitTitle", null, git.getLastCommitTitle)