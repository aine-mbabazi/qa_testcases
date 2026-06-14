const { sum, isAdult,reverseString } = require('../src/level1');

// SUM FUNCTION TESTS
describe('Sum Function', () => {

    // POSITIVE TEST CASES
    test('adds 2 + 3 to equal 5', () => {
        const a = 2;
        const b = 3;
        const result = sum(a, b);
        expect(result).toBe(5);
    });

    test('adds -1 + 1 to equal 0', () => {
        const a = -1;
        const b = 1;
        const result = sum(a, b);
        expect(result).toBe(0);
    });

    test('adds 0 + 0 to equal 0', () => {
        const a = 0;
        const b = 0;
        const result = sum(a, b);
        expect(result).toBe(0);
    });

    // NEGATIVE TEST CASES
    test('should not return 6 when adding 2 + 3', () => {
        const a = 2;
        const b = 3;
        const result = sum(a, b);
        expect(result).not.toBe(6);
    });

    test('should not return 1 when adding 0 + 0', () => {
        const a = 0;
        const b = 0;
        const result = sum(a, b);
        expect(result).not.toBe(1);
    });

    // EDGE / BOUNDARY TEST CASES
    test('adds two large numbers correctly', () => {
        const a = 1000000;
        const b = 2000000;
        const result = sum(a, b);
        expect(result).toBe(3000000);
    });

    test('adds a positive and a negative number correctly', () => {
        const a = 10;
        const b = -5;
        const result = sum(a, b);
        expect(result).toBe(5);
    });

});

// IS ADULT FUNCTION TESTS
describe('isAdult Function', () => {

    // POSITIVE TEST CASES (Should return true)
    test('should return true for age 18 (minimum adult age)', () => {
        const age = 18;
        const result = isAdult(age);
        expect(result).toBe(true);
    });

    test('should return true for age 25 (typical adult)', () => {
        const age = 25;
        const result = isAdult(age);
        expect(result).toBe(true);
    });

    test('should return true for age 100 (elderly adult)', () => {
        const age = 100;
        const result = isAdult(age);
        expect(result).toBe(true);
    });

    // NEGATIVE TEST CASES (Should return false)
    test('should return false for age 17 (minor)', () => {
        const age = 17;
        const result = isAdult(age);
        expect(result).toBe(false);
    });

    test('should return false for age 0 (newborn)', () => {
        const age = 0;
        const result = isAdult(age);
        expect(result).toBe(false);
    });

    // EDGE / BOUNDARY TEST CASES
    test('should return false for age 1 (toddler)', () => {
        const age = 1;
        const result = isAdult(age);
        expect(result).toBe(false);
    });

    test('should return false for age 5 (child)', () => {
        const age = 5;
        const result = isAdult(age);
        expect(result).toBe(false);
    });

    test('should return false for age 12 (pre-teen)', () => {
        const age = 12;
        const result = isAdult(age);
        expect(result).toBe(false);
    });

    // NEGATIVE TEST CASES - Wrong returns
    test('should not return false for age 18', () => {
        const age = 18;
        const result = isAdult(age);
        expect(result).not.toBe(false);
    });

    test('should not return true for age 17', () => {
        const age = 17;
        const result = isAdult(age);
        expect(result).not.toBe(true);
    });

});

// REVERSE STRING FUNCTION TESTS
describe('reverseString Function', () => {

    // POSITIVE TEST CASES

    test('should reverse "hello" to "olleh"', () => {
        // 1. ARRANGE
        const input = "hello";
        
        // 2. ACT
        const result = reverseString(input);
        
        // 3. ASSERT
        expect(result).toBe("olleh");
    });

    test('should reverse "QA" to "AQ"', () => {
        // 1. ARRANGE
        const input = "QA";
        
        // 2. ACT
        const result = reverseString(input);
        
        // 3. ASSERT
        expect(result).toBe("AQ");
    });

    test('should reverse empty string to empty string', () => {
        // 1. ARRANGE
        const input = "";
        
        // 2. ACT
        const result = reverseString(input);
        
        // 3. ASSERT
        expect(result).toBe("");
    });

    // ADDITIONAL TEST CASES FOR COMPLETENESS

    test('should reverse a single character', () => {
        // 1. ARRANGE
        const input = "a";
        
        // 2. ACT
        const result = reverseString(input);
        
        // 3. ASSERT
        expect(result).toBe("a");
    });

    test('should reverse a palindrome', () => {
        // 1. ARRANGE
        const input = "radar";
        
        // 2. ACT
        const result = reverseString(input);
        
        // 3. ASSERT
        expect(result).toBe("radar");
    });

    test('should reverse a sentence with spaces', () => {
        // 1. ARRANGE
        const input = "hello world";
        
        // 2. ACT
        const result = reverseString(input);
        
        // 3. ASSERT
        expect(result).toBe("dlrow olleh");
    });

    test('should reverse string with numbers', () => {
        // 1. ARRANGE
        const input = "abc123";
        
        // 2. ACT
        const result = reverseString(input);
        
        // 3. ASSERT
        expect(result).toBe("321cba");
    });

    test('should reverse string with special characters', () => {
        // 1. ARRANGE
        const input = "!@#$";
        
        // 2. ACT
        const result = reverseString(input);
        
        // 3. ASSERT
        expect(result).toBe("$#@!");
    });

    test('should reverse uppercase and lowercase mix', () => {
        // 1. ARRANGE
        const input = "QaTesting";
        
        // 2. ACT
        const result = reverseString(input);
        
        // 3. ASSERT
        expect(result).toBe("gnitseTaQ");
    });

    // NEGATIVE TEST CASES

    test('should NOT reverse "hello" to "hello"', () => {
        // 1. ARRANGE
        const input = "hello";
        
        // 2. ACT
        const result = reverseString(input);
        
        // 3. ASSERT
        expect(result).not.toBe("hello");
    });

    test('should NOT reverse "QA" to "QA"', () => {
        // 1. ARRANGE
        const input = "QA";
        
        // 2. ACT
        const result = reverseString(input);
        
        // 3. ASSERT
        expect(result).not.toBe("QA");
    });

    test('should NOT return undefined for empty string', () => {
        // 1. ARRANGE
        const input = "";
        
        // 2. ACT
        const result = reverseString(input);
        
        // 3. ASSERT
        expect(result).not.toBeUndefined();
    });

    // EDGE / BOUNDARY TEST CASES

    test('should handle string with spaces only', () => {
        // 1. ARRANGE
        const input = "   ";
        
        // 2. ACT
        const result = reverseString(input);
        
        // 3. ASSERT
        expect(result).toBe("   ");
    });

    test('should handle very long string', () => {
        // 1. ARRANGE
        const input = "a".repeat(1000);
        
        // 2. ACT
        const result = reverseString(input);
        
        // 3. ASSERT
        expect(result).toBe("a".repeat(1000));
    });

    test('should handle string with newline characters', () => {
        // 1. ARRANGE
        const input = "hello\nworld";
        
        // 2. ACT
        const result = reverseString(input);
        
        // 3. ASSERT
        expect(result).toBe("dlrow\nolleh");
    });

});