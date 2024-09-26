// Purpose: CommandLineArguments test

const Test = require("./test")
const CommandLineArguments = require("../command-line-arguments")

process.argv = ["key", "value", "key2", "value2", "key3"]

Test.assertTruthy(null, CommandLineArguments.hasValue, "key")
Test.assertFalsy(null, CommandLineArguments.hasValue, "key3")
Test.assertFalsy(null, CommandLineArguments.hasValue, "key4")
Test.assertMustEqual(null, 1, CommandLineArguments.getValueIndex, "key")
Test.assertMustEqual(null, 3, CommandLineArguments.getValueIndex, "key2")
Test.assertMustEqual(null, -1, CommandLineArguments.getValueIndex, "key3")
Test.assertMustEqual(null, -1, CommandLineArguments.getValueIndex, "key4")
Test.assertMustEqual(null, "value", CommandLineArguments.getValue, "key")
Test.assertMustEqual(null, "value2", CommandLineArguments.getValue, "key2")
Test.assertNull(null, CommandLineArguments.getValue, "key3")
Test.assertNull(null, CommandLineArguments.getValue, "key4")
Test.assertTruthy(null, CommandLineArguments.hasArgument, "key")
Test.assertTruthy(null, CommandLineArguments.hasArgument, "key2")
Test.assertFalsy(null, CommandLineArguments.hasArgument, "key4")