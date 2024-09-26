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

Test.assertMustEqual(milliseconds, Time.convertStringToMilliseconds, "123ms")
Test.assertMustEqual(seconds, Time.convertStringToMilliseconds, "123s")
Test.assertMustEqual(minutes, Time.convertStringToMilliseconds, "123m")
Test.assertMustEqual(hours, Time.convertStringToMilliseconds, "123h")
Test.assertMustEqual(days, Time.convertStringToMilliseconds, "123d")
Test.assertMustEqual(months, Time.convertStringToMilliseconds, "123mm")
Test.assertMustEqual(years, Time.convertStringToMilliseconds, "123y")
Test.assertMustEqual(decades, Time.convertStringToMilliseconds, "123dd")
Test.assertMustEqual(centuries, Time.convertStringToMilliseconds, "123c")
Test.assertMustEqual(millenniums, Time.convertStringToMilliseconds, "123mmm")
Test.assertMustEqual(milliseconds + seconds + minutes + hours + days + months + years + decades + centuries + millenniums, Time.convertStringToMilliseconds, "123mmm123c123dd123y123mm123d123h123m123s123ms")