//
// Copyright (c) 2024, Hedgehog Team.    All rights reserved.
//

// Purpose: OperatingSystemUser test

const OperatingSystemUser = require("../operating-system-user")

if (OperatingSystemUser.isAdmin())
    console.warn("You're running this as an admin")
else
    console.log("You're not running this as an admin")
