const { divide, validatePassword } = require('../src/level4');

// QUESTION 10: DIVISION FUNCTION TESTS
describe('divide Function - Exception Testing', () => {

    // POSITIVE TEST CASES
    test('should divide 10 by 2 to return 5', () => {
        // 1. ARRANGE
        const a = 10;
        const b = 2;

        // 2. ACT
        const result = divide(a, b);

        // 3. ASSERT
        expect(result).toBe(5);
    });

    test('should divide 9 by 3 to return 3', () => {
        // 1. ARRANGE
        const a = 9;
        const b = 3;

        // 2. ACT
        const result = divide(a, b);

        // 3. ASSERT
        expect(result).toBe(3);
    });

    test('should divide negative number correctly', () => {
        // 1. ARRANGE
        const a = -6;
        const b = 2;

        // 2. ACT
        const result = divide(a, b);

        // 3. ASSERT
        expect(result).toBe(-3);
    });

    test('should return decimal result for non-integer division', () => {
        // 1. ARRANGE
        const a = 1;
        const b = 4;

        // 2. ACT
        const result = divide(a, b);

        // 3. ASSERT
        expect(result).toBe(0.25);
    });

    // NEGATIVE TEST CASES
    test('should throw "Cannot divide by zero" when dividing by 0', () => {
        // 1. ARRANGE
        const a = 10;
        const b = 0;

        // 2. ACT & ASSERT
        expect(() => divide(a, b)).toThrow('Cannot divide by zero');
    });

    test('should throw an Error instance when dividing by zero', () => {
        // 1. ARRANGE
        const a = 5;
        const b = 0;

        // 2. ACT & ASSERT
        expect(() => divide(a, b)).toThrow(Error);
    });

    test('should throw when 0 is the denominator regardless of numerator', () => {
        expect(() => divide(0, 0)).toThrow('Cannot divide by zero');
        expect(() => divide(-10, 0)).toThrow('Cannot divide by zero');
        expect(() => divide(999, 0)).toThrow('Cannot divide by zero');
    });

    // BOUNDARY TEST CASES
    test('should correctly divide by 1 (identity)', () => {
        // 1. ARRANGE
        const a = 100;
        const b = 1;

        // 2. ACT
        const result = divide(a, b);

        // 3. ASSERT
        expect(result).toBe(100);
    });

    test('should correctly divide by -1', () => {
        // 1. ARRANGE
        const a = 100;
        const b = -1;

        // 2. ACT
        const result = divide(a, b);

        // 3. ASSERT
        expect(result).toBe(-100);
    });

    test('should return 0 when dividing 0 by a non-zero number', () => {
        // 1. ARRANGE
        const a = 0;
        const b = 5;

        // 2. ACT
        const result = divide(a, b);

        // 3. ASSERT
        expect(result).toBe(0);
    });

    // Using test.each for comprehensive valid division tests
    test.each([
        [10, 2, 5, "basic even division"],
        [7, 2, 3.5, "decimal result"],
        [0, 5, 0, "zero numerator"],
        [-10, 2, -5, "negative numerator"],
        [10, -2, -5, "negative denominator"],
        [-10, -2, 5, "both negative"]
    ])('divide(%i, %i) should return %f (%s)', (a, b, expected) => {
        expect(divide(a, b)).toBe(expected);
    });
});


// QUESTION 11: PASSWORD VALIDATION FUNCTION TESTS
describe('validatePassword Function - Exception Testing', () => {

    // POSITIVE TEST CASES
    test('should return true for a valid password with 8 characters', () => {
        // 1. ARRANGE
        const password = "password";  // exactly 8 characters

        // 2. ACT
        const result = validatePassword(password);

        // 3. ASSERT
        expect(result).toBe(true);
    });

    test('should return true for a password longer than 8 characters', () => {
        // 1. ARRANGE
        const password = "securePassword123";

        // 2. ACT
        const result = validatePassword(password);

        // 3. ASSERT
        expect(result).toBe(true);
    });

    test('should return true for password with special characters', () => {
        // 1. ARRANGE
        const password = "P@ssw0rd!";

        // 2. ACT
        const result = validatePassword(password);

        // 3. ASSERT
        expect(result).toBe(true);
    });

    // NEGATIVE TEST CASES
    test('should throw "Password too short" for password with 7 characters', () => {
        // 1. ARRANGE
        const password = "pass123";  // 7 characters

        // 2. ACT & ASSERT
        expect(() => validatePassword(password)).toThrow('Password too short');
    });

    test('should throw an Error instance for short password', () => {
        // 1. ARRANGE
        const password = "short";

        // 2. ACT & ASSERT
        expect(() => validatePassword(password)).toThrow(Error);
    });

    test('should throw for empty password', () => {
        // 1. ARRANGE
        const password = "";

        // 2. ACT & ASSERT
        expect(() => validatePassword(password)).toThrow('Password too short');
    });

    test('should throw for single character password', () => {
        // 1. ARRANGE
        const password = "a";

        // 2. ACT & ASSERT
        expect(() => validatePassword(password)).toThrow('Password too short');
    });

    // BOUNDARY TEST CASES
    test('should throw for password with exactly 7 characters (just below minimum)', () => {
        // 1. ARRANGE
        const password = "1234567";  // 7 characters — just below boundary

        // 2. ACT & ASSERT
        expect(() => validatePassword(password)).toThrow('Password too short');
    });

    test('should return true for password with exactly 8 characters (minimum boundary)', () => {
        // 1. ARRANGE
        const password = "12345678";  // 8 characters — exact boundary

        // 2. ACT
        const result = validatePassword(password);

        // 3. ASSERT
        expect(result).toBe(true);
    });

    test('should return true for password with exactly 9 characters (just above minimum)', () => {
        // 1. ARRANGE
        const password = "123456789";  // 9 characters — just above boundary

        // 2. ACT
        const result = validatePassword(password);

        // 3. ASSERT
        expect(result).toBe(true);
    });

    // Using test.each for comprehensive boundary testing
    test.each([
        ["", false, "empty password"],
        ["abc", false, "3 characters"],
        ["abcdefg", false, "7 characters (just below)"],
        ["abcdefgh", true, "8 characters (exact boundary)"],
        ["abcdefghi", true, "9 characters (just above)"],
        ["a".repeat(100), true, "very long password"]
    ])('password of length %s should %s (%s)', (password, shouldBeValid) => {
        if (shouldBeValid) {
            expect(validatePassword(password)).toBe(true);
        } else {
            expect(() => validatePassword(password)).toThrow('Password too short');
        }
    });
});
