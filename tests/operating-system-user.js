//
// Copyright (c) 2024, Hedgehog Team.    All rights reserved.
//

// Purpose: OperatingSystemUser test

const OperatingSystemUser = require("../operating-system-user")

const main = async () => {
    if (await OperatingSystemUser.isAdmin())
        console.warn("You're running this as an admin")
    else
        console.log("You're not running this as an admin")
}

main()