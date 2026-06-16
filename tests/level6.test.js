const { withdraw, transfer } = require('../src/level6');

// QUESTION 14: BANK WITHDRAWAL TESTS
describe('withdraw Function - Real QA Thinking', () => {

    // POSITIVE TEST CASES
    test('should return 400 when withdrawing 100 from balance of 500', () => {
        // 1. ARRANGE
        const balance = 500;
        const amount = 100;

        // 2. ACT
        const result = withdraw(balance, amount);

        // 3. ASSERT
        expect(result).toBe(400);
    });

    test('should return correct balance after withdrawing a small amount', () => {
        // 1. ARRANGE
        const balance = 1000;
        const amount = 1;

        // 2. ACT
        const result = withdraw(balance, amount);

        // 3. ASSERT
        expect(result).toBe(999);
    });

    test('should return correct balance when withdrawing just below full balance', () => {
        // 1. ARRANGE
        const balance = 500;
        const amount = 499;  // balance - 1

        // 2. ACT
        const result = withdraw(balance, amount);

        // 3. ASSERT
        expect(result).toBe(1);
    });

    // NEGATIVE TEST CASES
    test('should throw "Insufficient funds" when withdrawing more than balance', () => {
        // 1. ARRANGE
        const balance = 500;
        const amount = 600;

        // 2. ACT & ASSERT
        expect(() => withdraw(balance, amount)).toThrow('Insufficient funds');
    });

    test('should throw "Invalid amount" when withdrawing 0', () => {
        // 1. ARRANGE
        const balance = 500;
        const amount = 0;

        // 2. ACT & ASSERT
        expect(() => withdraw(balance, amount)).toThrow('Invalid amount');
    });

    test('should throw "Invalid amount" when withdrawing a negative amount', () => {
        // 1. ARRANGE
        const balance = 500;
        const amount = -50;

        // 2. ACT & ASSERT
        expect(() => withdraw(balance, amount)).toThrow('Invalid amount');
    });

    test('should throw an Error instance for invalid amount', () => {
        expect(() => withdraw(500, 0)).toThrow(Error);
        expect(() => withdraw(500, -1)).toThrow(Error);
    });

    test('should throw an Error instance for insufficient funds', () => {
        expect(() => withdraw(100, 200)).toThrow(Error);
    });

    // BOUNDARY TEST CASES
    test('should return 0 when withdrawing the full balance', () => {
        // 1. ARRANGE
        const balance = 500;
        const amount = 500;  // exact balance

        // 2. ACT
        const result = withdraw(balance, amount);

        // 3. ASSERT
        expect(result).toBe(0);
    });

    test('should throw "Insufficient funds" when amount is 1 more than balance', () => {
        // 1. ARRANGE
        const balance = 500;
        const amount = 501;  // balance + 1

        // 2. ACT & ASSERT
        expect(() => withdraw(balance, amount)).toThrow('Insufficient funds');
    });

    test('should throw "Invalid amount" for amount of -1 (just below zero)', () => {
        // 1. ARRANGE
        const balance = 500;
        const amount = -1;

        // 2. ACT & ASSERT
        expect(() => withdraw(balance, amount)).toThrow('Invalid amount');
    });

    test('should succeed for amount of 1 (just above zero boundary)', () => {
        // 1. ARRANGE
        const balance = 500;
        const amount = 1;

        // 2. ACT
        const result = withdraw(balance, amount);

        // 3. ASSERT
        expect(result).toBe(499);
    });

    // Using test.each for comprehensive positive cases
    test.each([
        [500, 100, 400, "standard withdrawal"],
        [1000, 1, 999, "minimum valid amount"],
        [500, 499, 1, "balance minus 1"],
        [500, 500, 0, "full balance withdrawal"],
        [200, 50, 150, "partial withdrawal"]
    ])('withdraw(%i, %i) should return %i (%s)', (balance, amount, expected) => {
        expect(withdraw(balance, amount)).toBe(expected);
    });

    // Using test.each for all throwing scenarios
    test.each([
        [500, 0, 'Invalid amount', "zero amount"],
        [500, -1, 'Invalid amount', "negative amount"],
        [500, -100, 'Invalid amount', "large negative amount"],
        [500, 501, 'Insufficient funds', "one over balance"],
        [500, 600, 'Insufficient funds', "well over balance"],
        [0, 1, 'Insufficient funds', "zero balance any withdrawal"]
    ])('withdraw(%i, %i) should throw "%s" (%s)', (balance, amount, errorMessage) => {
        expect(() => withdraw(balance, amount)).toThrow(errorMessage);
    });
});


// QUESTION 15: MOBILE MONEY TRANSFER TESTS
describe('transfer Function - Real QA Thinking', () => {

    // POSITIVE TEST CASES
    test('should return correct balance after a valid transfer', () => {
        // 1. ARRANGE
        const balance = 500;
        const amount = 100;

        // 2. ACT
        const result = transfer(balance, amount);

        // 3. ASSERT
        expect(result).toBe(400);
    });

    test('should return correct balance for minimum valid transfer amount of exactly 10', () => {
        // 1. ARRANGE
        const balance = 500;
        const amount = 10;

        // 2. ACT
        const result = transfer(balance, amount);

        // 3. ASSERT
        expect(result).toBe(490);
    });

    test('should return 0 when transferring full balance', () => {
        // 1. ARRANGE
        const balance = 200;
        const amount = 200;

        // 2. ACT
        const result = transfer(balance, amount);

        // 3. ASSERT
        expect(result).toBe(0);
    });

    test('should return 1 when transferring balance minus 1', () => {
        // 1. ARRANGE
        const balance = 500;
        const amount = 499;

        // 2. ACT
        const result = transfer(balance, amount);

        // 3. ASSERT
        expect(result).toBe(1);
    });

    // NEGATIVE TEST CASES
    test('should throw "Minimum transfer is 10" for amount below 10', () => {
        // 1. ARRANGE
        const balance = 500;
        const amount = 5;

        // 2. ACT & ASSERT
        expect(() => transfer(balance, amount)).toThrow('Minimum transfer is 10');
    });

    test('should throw "Minimum transfer is 10" for amount of 0', () => {
        // 1. ARRANGE
        const balance = 500;
        const amount = 0;

        // 2. ACT & ASSERT
        expect(() => transfer(balance, amount)).toThrow('Minimum transfer is 10');
    });

    test('should throw "Minimum transfer is 10" for negative amount', () => {
        // 1. ARRANGE
        const balance = 500;
        const amount = -50;

        // 2. ACT & ASSERT
        expect(() => transfer(balance, amount)).toThrow('Minimum transfer is 10');
    });

    test('should throw "Insufficient balance" when amount exceeds balance', () => {
        // 1. ARRANGE
        const balance = 100;
        const amount = 200;

        // 2. ACT & ASSERT
        expect(() => transfer(balance, amount)).toThrow('Insufficient balance');
    });

    test('should throw an Error instance for all invalid cases', () => {
        expect(() => transfer(500, 5)).toThrow(Error);
        expect(() => transfer(100, 200)).toThrow(Error);
    });

    // BOUNDARY TEST CASES
    test('should throw "Minimum transfer is 10" for amount of 9 (just below minimum)', () => {
        // 1. ARRANGE
        const balance = 500;
        const amount = 9;  // just below minimum of 10

        // 2. ACT & ASSERT
        expect(() => transfer(balance, amount)).toThrow('Minimum transfer is 10');
    });

    test('should succeed for amount of 10 (exactly the minimum)', () => {
        // 1. ARRANGE
        const balance = 500;
        const amount = 10;  // exact minimum boundary

        // 2. ACT
        const result = transfer(balance, amount);

        // 3. ASSERT
        expect(result).toBe(490);
    });

    test('should succeed for amount of 11 (just above minimum)', () => {
        // 1. ARRANGE
        const balance = 500;
        const amount = 11;

        // 2. ACT
        const result = transfer(balance, amount);

        // 3. ASSERT
        expect(result).toBe(489);
    });

    test('should throw "Insufficient balance" when amount is 1 more than balance', () => {
        // 1. ARRANGE
        const balance = 100;
        const amount = 101;  // balance + 1

        // 2. ACT & ASSERT
        expect(() => transfer(balance, amount)).toThrow('Insufficient balance');
    });

    // EDGE CASES
    test('should succeed when balance equals amount and both are at minimum', () => {
        // 1. ARRANGE
        const balance = 10;
        const amount = 10;

        // 2. ACT
        const result = transfer(balance, amount);

        // 3. ASSERT
        expect(result).toBe(0);
    });

    test('should throw minimum transfer error even when balance is zero', () => {
        // 1. ARRANGE
        const balance = 0;
        const amount = 5;

        // 2. ACT & ASSERT — minimum check fires before balance check
        expect(() => transfer(balance, amount)).toThrow('Minimum transfer is 10');
    });

    test('should throw insufficient balance when amount is valid but balance is too low', () => {
        // 1. ARRANGE
        const balance = 10;
        const amount = 20;

        // 2. ACT & ASSERT
        expect(() => transfer(balance, amount)).toThrow('Insufficient balance');
    });

    // Using test.each for comprehensive positive cases
    test.each([
        [500, 10, 490, "minimum transfer"],
        [500, 100, 400, "standard transfer"],
        [200, 200, 0, "full balance transfer"],
        [500, 499, 1, "balance minus 1"],
        [1000, 500, 500, "half balance"]
    ])('transfer(%i, %i) should return %i (%s)', (balance, amount, expected) => {
        expect(transfer(balance, amount)).toBe(expected);
    });

    // Using test.each for all throwing scenarios
    test.each([
        [500, 9, 'Minimum transfer is 10', "amount just below minimum"],
        [500, 0, 'Minimum transfer is 10', "zero amount"],
        [500, -10, 'Minimum transfer is 10', "negative amount"],
        [100, 200, 'Insufficient balance', "amount over balance"],
        [100, 101, 'Insufficient balance', "one over balance"]
    ])('transfer(%i, %i) should throw "%s" (%s)', (balance, amount, errorMessage) => {
        expect(() => transfer(balance, amount)).toThrow(errorMessage);
    });
});
