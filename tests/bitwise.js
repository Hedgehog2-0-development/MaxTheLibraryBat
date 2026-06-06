//
// Copyright (c) 2024, Hedgehog Team.    All rights reserved.
//

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

const bigEnumerator = Bitwise.createBigEnumerator({
    test1: 0,
    test2: 0,
    test3: 0,
    test4: 0,
    test5: 0,
    test6: 0,
    test7: 0,
    test8: 0,
    test9: 0,
    test10: 0,
    test11: 0,
    test12: 0,
    test13: 0,
    test14: 0,
    test15: 0,
    test16: 0,
    test17: 0,
    test18: 0,
    test19: 0,
    test20: 0,
    test21: 0,
    test22: 0,
    test23: 0,
    test24: 0,
    test25: 0,
    test26: 0,
    test27: 0,
    test28: 0,
    test29: 0,
    test30: 0,
    test31: 0,
    test32: 0, // NOTE(kratcy): On normal createEnumerator, this would have an integer overflow
    test33: 0,

    test34: -1
})

Test.assertMustEqual(Test, 0n, "returnVariable", bigEnumerator.test1)
Test.assertMustEqual(Test, 1n, "returnVariable", bigEnumerator.test2)
Test.assertMustEqual(Test, 4n, "returnVariable", bigEnumerator.test3)
Test.assertMustEqual(Test, 8n, "returnVariable", bigEnumerator.test4)
Test.assertMustEqual(Test, 16n, "returnVariable", bigEnumerator.test5)
Test.assertMustEqual(Test, 32n, "returnVariable", bigEnumerator.test6)
Test.assertMustEqual(Test, 64n, "returnVariable", bigEnumerator.test7)
Test.assertMustEqual(Test, 128n, "returnVariable", bigEnumerator.test8)
Test.assertMustEqual(Test, 256n, "returnVariable", bigEnumerator.test9)
Test.assertMustEqual(Test, 4294967296n, "returnVariable", bigEnumerator.test33)
// Test.assertMustEqual(Test, 256, "returnVariable", bigEnumerator.test33)
Test.assertMustEqual(Test, -1, "returnVariable", bigEnumerator.test34)
