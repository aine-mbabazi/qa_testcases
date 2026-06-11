const { sum } = require('../src/level1');
describe('Sum Function', () => {

    // POSITIVE TEST CASES

    test('adds 2 + 3 to equal 5', () => {

        // 1. ARRANGE
        const a = 2;
        const b = 3;

        // 2. ACT
        const result = sum(a, b);

        // 3. ASSERT
        expect(result).toBe(5);

    });

    test('adds -1 + 1 to equal 0', () => {

        // 1. ARRANGE
        const a = -1;
        const b = 1;

        // 2. ACT
        const result = sum(a, b);

        // 3. ASSERT
        expect(result).toBe(0);

    });

    test('adds 0 + 0 to equal 0', () => {

        // 1. ARRANGE
        const a = 0;
        const b = 0;

        // 2. ACT
        const result = sum(a, b);

        // 3. ASSERT
        expect(result).toBe(0);

    });

    // NEGATIVE TEST CASES

    test('should not return 6 when adding 2 + 3', () => {

        // 1. ARRANGE
        const a = 2;
        const b = 3;

        // 2. ACT
        const result = sum(a, b);

        // 3. ASSERT
        expect(result).not.toBe(6);

    });

    test('should not return 1 when adding 0 + 0', () => {

        // 1. ARRANGE
        const a = 0;
        const b = 0;

        // 2. ACT
        const result = sum(a, b);

        // 3. ASSERT
        expect(result).not.toBe(1);

    });

    // EDGE / BOUNDARY TEST CASES

    test('adds two large numbers correctly', () => {

        // 1. ARRANGE
        const a = 1000000;
        const b = 2000000;

        // 2. ACT
        const result = sum(a, b);

        // 3. ASSERT
        expect(result).toBe(3000000);

    });

    test('adds a positive and a negative number correctly', () => {

        // 1. ARRANGE
        const a = 10;
        const b = -5;

        // 2. ACT
        const result = sum(a, b);

        // 3. ASSERT
        expect(result).toBe(5);

    });

});