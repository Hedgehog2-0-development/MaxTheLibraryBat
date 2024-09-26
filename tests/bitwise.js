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

Test.assertMustEqual(0, Test.returnVariable, enumerator.test1)
Test.assertMustEqual(1, Test.returnVariable, enumerator.test2)
Test.assertMustEqual(4, Test.returnVariable, enumerator.test3)
Test.assertMustEqual(8, Test.returnVariable, enumerator.test4)
Test.assertMustEqual(16, Test.returnVariable, enumerator.test5)
Test.assertMustEqual(32, Test.returnVariable, enumerator.test6)
Test.assertMustEqual(64, Test.returnVariable, enumerator.test7)
Test.assertMustEqual(128, Test.returnVariable, enumerator.test8)
Test.assertMustEqual(256, Test.returnVariable, enumerator.test9)
Test.assertMustEqual(-1, Test.returnVariable, enumerator.test10)

enumerator.test9 = 100

Test.assertMustEqual(256, Test.returnVariable, enumerator.test9)