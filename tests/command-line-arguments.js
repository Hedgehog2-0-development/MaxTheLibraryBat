// Purpose: CommandLineArguments test

const Test = require("./test")
const CommandLineArguments = require("../command-line-arguments")

process.argv = ["key", "value", "key2", "value2", "key3"]

Test.assertTruthy(CommandLineArguments, "hasValue", "key")
Test.assertFalsy(CommandLineArguments, "hasValue", "key3")
Test.assertFalsy(CommandLineArguments, "hasValue", "key4")
Test.assertMustEqual(CommandLineArguments, 1, "getValueIndex", "key")
Test.assertMustEqual(CommandLineArguments, 3, "getValueIndex", "key2")
Test.assertMustEqual(CommandLineArguments, -1, "getValueIndex", "key3")
Test.assertMustEqual(CommandLineArguments, -1, "getValueIndex", "key4")
Test.assertMustEqual(CommandLineArguments, "value", "getValue", "key")
Test.assertMustEqual(CommandLineArguments, "value2", "getValue", "key2")
Test.assertNull(CommandLineArguments, "getValue", "key3")
Test.assertNull(CommandLineArguments, "getValue", "key4")
Test.assertTruthy(CommandLineArguments, "hasArgument", "key")
Test.assertTruthy(CommandLineArguments, "hasArgument", "key2")
Test.assertFalsy(CommandLineArguments, "hasArgument", "key4")