// Purpose: Bitwise test

const Test = require("./test")
const Bitwise = require("../bitwise")

const enumerator = Bitwise.createEnumerator({
    test1: 0,
    test2: 0,
    test3: 0,
    test4: 0,
    test5: 0,
    test6: 0,
    test7: 0,
    test8: 0,
    test9: 0,
    
    test10: -1
})

Test.assertMustEqual(Test, 0, "returnVariable", enumerator.test1)
Test.assertMustEqual(Test, 1, "returnVariable", enumerator.test2)
Test.assertMustEqual(Test, 4, "returnVariable", enumerator.test3)
Test.assertMustEqual(Test, 8, "returnVariable", enumerator.test4)
Test.assertMustEqual(Test, 16, "returnVariable", enumerator.test5)
Test.assertMustEqual(Test, 32, "returnVariable", enumerator.test6)
Test.assertMustEqual(Test, 64, "returnVariable", enumerator.test7)
Test.assertMustEqual(Test, 128, "returnVariable", enumerator.test8)
Test.assertMustEqual(Test, 256, "returnVariable", enumerator.test9)
Test.assertMustEqual(Test, -1, "returnVariable", enumerator.test10)

enumerator.test9 = 100

Test.assertMustEqual(Test,  256, "returnVariable", enumerator.test9)