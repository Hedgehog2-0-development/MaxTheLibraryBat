// Purpose: Parser test

const Test = require("./test")
const Parser = require("../parser")

const parser = new Parser({
    "string": "test",
    "float": "12.1",
    "integer": "12",
    "boolean": "true",
    "time": "123s"
})

Test.assertMustEqual(parser, "test", parser.getString, "string")
// TODO(kratcy): Float is hard to test, due to floating point precision errors
Test.assertMustEqual(parser, 12, parser.getInteger, "integer")
Test.assertTruthy(parser, parser.getBoolean, "float")
Test.assertTruthy(parser, parser.getBoolean, "integer")
Test.assertTruthy(parser, parser.getBoolean, "boolean")
Test.assertMustEqual(parser, 123 * 1000, parser.getTimeMilliseconds, "time")
Test.assertTruthy(parser, parser.isNumber, "integer")
Test.assertFalsy(parser, parser.isNumber, "boolean")
Test.assertFalsy(parser, parser.isNumber, "time")