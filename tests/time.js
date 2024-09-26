// Purpose: Time test

const Test = require("./test")
const Time = require("../time")

const milliseconds = 123
const seconds = milliseconds * 1000
const minutes = milliseconds * 60000
const hours = milliseconds * 3600000
const days = milliseconds * 86400000
const months = milliseconds * 2628000000
const years = milliseconds * 31540000000
const decades = milliseconds * 315400000000
const centuries = milliseconds * 3154000000000
const millenniums = milliseconds * 31540000000000

Test.assertMustEqual(Time, milliseconds, "convertStringToMilliseconds", "123ms")
Test.assertMustEqual(Time, seconds, "convertStringToMilliseconds", "123s")
Test.assertMustEqual(Time, minutes, "convertStringToMilliseconds", "123m")
Test.assertMustEqual(Time, hours, "convertStringToMilliseconds", "123h")
Test.assertMustEqual(Time, days, "convertStringToMilliseconds", "123d")
Test.assertMustEqual(Time, months, "convertStringToMilliseconds", "123mm")
Test.assertMustEqual(Time, years, "convertStringToMilliseconds", "123y")
Test.assertMustEqual(Time, decades, "convertStringToMilliseconds", "123dd")
Test.assertMustEqual(Time, centuries, "convertStringToMilliseconds", "123c")
Test.assertMustEqual(Time, millenniums, "convertStringToMilliseconds", "123mmm")
Test.assertMustEqual(Time, milliseconds + seconds, "convertStringToMilliseconds", "123s123ms")
Test.assertMustEqual(Time, milliseconds + seconds + minutes, "convertStringToMilliseconds", "123m123s123ms")
Test.assertMustEqual(Time, milliseconds + seconds + minutes + hours, "convertStringToMilliseconds", "123h123m123s123ms")
Test.assertMustEqual(Time, milliseconds + seconds + minutes + hours + days, "convertStringToMilliseconds", "123d123h123m123s123ms")
Test.assertMustEqual(Time, milliseconds + seconds + minutes + hours + days + months, "convertStringToMilliseconds", "123mm123d123h123m123s123ms")
Test.assertMustEqual(Time, milliseconds + seconds + minutes + hours + days + months + years, "convertStringToMilliseconds", "123y123mm123d123h123m123s123ms")
Test.assertMustEqual(Time, milliseconds + seconds + minutes + hours + days + months + years + decades, "convertStringToMilliseconds", "123dd123y123mm123d123h123m123s123ms")
Test.assertMustEqual(Time, milliseconds + seconds + minutes + hours + days + months + years + decades + centuries, "convertStringToMilliseconds", "123c123dd123y123mm123d123h123m123s123ms")
Test.assertMustEqual(Time, milliseconds + seconds + minutes + hours + days + months + years + decades + centuries + millenniums, "convertStringToMilliseconds", "123mmm123c123dd123y123mm123d123h123m123s123ms")