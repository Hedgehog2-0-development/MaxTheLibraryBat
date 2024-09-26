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

Test.assertMustEqual(null, milliseconds, Time.convertStringToMilliseconds, "123ms")
Test.assertMustEqual(null, seconds, Time.convertStringToMilliseconds, "123s")
Test.assertMustEqual(null, minutes, Time.convertStringToMilliseconds, "123m")
Test.assertMustEqual(null, hours, Time.convertStringToMilliseconds, "123h")
Test.assertMustEqual(null, days, Time.convertStringToMilliseconds, "123d")
Test.assertMustEqual(null, months, Time.convertStringToMilliseconds, "123mm")
Test.assertMustEqual(null, years, Time.convertStringToMilliseconds, "123y")
Test.assertMustEqual(null, decades, Time.convertStringToMilliseconds, "123dd")
Test.assertMustEqual(null, centuries, Time.convertStringToMilliseconds, "123c")
Test.assertMustEqual(null, millenniums, Time.convertStringToMilliseconds, "123mmm")
Test.assertMustEqual(null, milliseconds + seconds, Time.convertStringToMilliseconds, "123s123ms")
Test.assertMustEqual(null, milliseconds + seconds + minutes, Time.convertStringToMilliseconds, "123m123s123ms")
Test.assertMustEqual(null, milliseconds + seconds + minutes + hours, Time.convertStringToMilliseconds, "123h123m123s123ms")
Test.assertMustEqual(null, milliseconds + seconds + minutes + hours + days, Time.convertStringToMilliseconds, "123d123h123m123s123ms")
Test.assertMustEqual(null, milliseconds + seconds + minutes + hours + days + months, Time.convertStringToMilliseconds, "123mm123d123h123m123s123ms")
Test.assertMustEqual(null, milliseconds + seconds + minutes + hours + days + months + years, Time.convertStringToMilliseconds, "123y123mm123d123h123m123s123ms")
Test.assertMustEqual(null, milliseconds + seconds + minutes + hours + days + months + years + decades, Time.convertStringToMilliseconds, "123dd123y123mm123d123h123m123s123ms")
Test.assertMustEqual(null, milliseconds + seconds + minutes + hours + days + months + years + decades + centuries, Time.convertStringToMilliseconds, "123c123dd123y123mm123d123h123m123s123ms")
Test.assertMustEqual(null, milliseconds + seconds + minutes + hours + days + months + years + decades + centuries + millenniums, Time.convertStringToMilliseconds, "123mmm123c123dd123y123mm123d123h123m123s123ms")