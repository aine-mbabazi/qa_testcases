const { registerUser } = require('../src/challenge');

// CHALLENGE ASSIGNMENT: registerUser Function
// Scenarios identified:
//
// POSITIVE:
//   1. Valid name, valid email (with @), age >= 18 → returns user object
//   2. Valid inputs with age exactly 18 (boundary)
//   3. Valid inputs with age well above 18
//
// NEGATIVE:
//   4. Empty string name → throws 'Name required'
//   5. null / falsy name → throws 'Name required'
//   6. Email without '@' → throws 'Invalid email'
//   7. Age below 18 (e.g. 17) → throws 'Must be 18 or older'
//   8. Age of 0 → throws 'Must be 18 or older'
//   9. Negative age → throws 'Must be 18 or older'
//
// BOUNDARY:
//   10. Age exactly 18 → succeeds
//   11. Age exactly 17 (just below) → throws
//   12. Email with exactly one '@' → succeeds
//
// EDGE:
//   13. Name with only spaces (truthy) → passes name check (logged as design note)
//   14. Email that is only '@' (contains '@' but nothing else) → passes email check
//   15. Very long valid inputs → succeeds

describe('registerUser Function - Challenge Assignment (100% Coverage)', () => {

    // ──────────────────────────────────────────────────────
    // POSITIVE TEST CASES
    // ──────────────────────────────────────────────────────

    test('should return a user object with correct properties for valid inputs', () => {
        // 1. ARRANGE
        const name = 'John';
        const email = 'john@example.com';
        const age = 25;

        // 2. ACT
        const result = registerUser(name, email, age);

        // 3. ASSERT
        expect(result).toEqual({ name: 'John', email: 'john@example.com', age: 25 });
    });

    test('should return object containing the provided name', () => {
        // 1. ARRANGE
        const name = 'Alice';
        const email = 'alice@example.com';
        const age = 30;

        // 2. ACT
        const result = registerUser(name, email, age);

        // 3. ASSERT
        expect(result.name).toBe('Alice');
    });

    test('should return object containing the provided email', () => {
        // 1. ARRANGE
        const name = 'Bob';
        const email = 'bob@mail.org';
        const age = 22;

        // 2. ACT
        const result = registerUser(name, email, age);

        // 3. ASSERT
        expect(result.email).toBe('bob@mail.org');
    });

    test('should return object containing the provided age', () => {
        // 1. ARRANGE
        const name = 'Carol';
        const email = 'carol@example.com';
        const age = 35;

        // 2. ACT
        const result = registerUser(name, email, age);

        // 3. ASSERT
        expect(result.age).toBe(35);
    });

    test('should return a plain object (not an array)', () => {
        // 1. ARRANGE
        const name = 'Dave';
        const email = 'dave@example.com';
        const age = 20;

        // 2. ACT
        const result = registerUser(name, email, age);

        // 3. ASSERT
        expect(typeof result).toBe('object');
        expect(Array.isArray(result)).toBe(false);
        expect(result).not.toBeNull();
    });

    // ──────────────────────────────────────────────────────
    // NEGATIVE TEST CASES
    // ──────────────────────────────────────────────────────

    test('should throw "Name required" when name is an empty string', () => {
        // 1. ARRANGE
        const name = '';
        const email = 'valid@example.com';
        const age = 20;

        // 2. ACT & ASSERT
        expect(() => registerUser(name, email, age)).toThrow('Name required');
    });

    test('should throw "Name required" when name is null', () => {
        // 1. ARRANGE
        const name = null;
        const email = 'valid@example.com';
        const age = 20;

        // 2. ACT & ASSERT
        expect(() => registerUser(name, email, age)).toThrow('Name required');
    });

    test('should throw "Name required" when name is undefined', () => {
        // 1. ARRANGE
        const name = undefined;
        const email = 'valid@example.com';
        const age = 20;

        // 2. ACT & ASSERT
        expect(() => registerUser(name, email, age)).toThrow('Name required');
    });

    test('should throw "Invalid email" when email does not contain @', () => {
        // 1. ARRANGE
        const name = 'John';
        const email = 'invalidemail.com';
        const age = 20;

        // 2. ACT & ASSERT
        expect(() => registerUser(name, email, age)).toThrow('Invalid email');
    });

    test('should throw "Invalid email" when email is a plain word with no @', () => {
        // 1. ARRANGE
        const name = 'Jane';
        const email = 'notanemail';
        const age = 25;

        // 2. ACT & ASSERT
        expect(() => registerUser(name, email, age)).toThrow('Invalid email');
    });

    test('should throw "Must be 18 or older" when age is 17', () => {
        // 1. ARRANGE
        const name = 'Teen';
        const email = 'teen@example.com';
        const age = 17;

        // 2. ACT & ASSERT
        expect(() => registerUser(name, email, age)).toThrow('Must be 18 or older');
    });

    test('should throw "Must be 18 or older" when age is 0', () => {
        // 1. ARRANGE
        const name = 'Baby';
        const email = 'baby@example.com';
        const age = 0;

        // 2. ACT & ASSERT
        expect(() => registerUser(name, email, age)).toThrow('Must be 18 or older');
    });

    test('should throw "Must be 18 or older" when age is negative', () => {
        // 1. ARRANGE
        const name = 'Invalid';
        const email = 'invalid@example.com';
        const age = -5;

        // 2. ACT & ASSERT
        expect(() => registerUser(name, email, age)).toThrow('Must be 18 or older');
    });

    // Verify each throw is an Error instance
    test('should throw an Error instance for each invalid scenario', () => {
        expect(() => registerUser('', 'a@b.com', 20)).toThrow(Error);
        expect(() => registerUser('John', 'noemail', 20)).toThrow(Error);
        expect(() => registerUser('John', 'a@b.com', 17)).toThrow(Error);
    });

    // ──────────────────────────────────────────────────────
    // BOUNDARY TEST CASES
    // ──────────────────────────────────────────────────────

    test('should succeed when age is exactly 18 (minimum adult age boundary)', () => {
        // 1. ARRANGE
        const name = 'Young Adult';
        const email = 'young@example.com';
        const age = 18;  // exact boundary

        // 2. ACT
        const result = registerUser(name, email, age);

        // 3. ASSERT
        expect(result).toEqual({ name: 'Young Adult', email: 'young@example.com', age: 18 });
    });

    test('should throw "Must be 18 or older" when age is 17 (just below boundary)', () => {
        // 1. ARRANGE
        const name = 'Almost Adult';
        const email = 'almost@example.com';
        const age = 17;  // just below boundary

        // 2. ACT & ASSERT
        expect(() => registerUser(name, email, age)).toThrow('Must be 18 or older');
    });

    test('should succeed when age is 19 (just above boundary)', () => {
        // 1. ARRANGE
        const name = 'Just Adult';
        const email = 'just@example.com';
        const age = 19;

        // 2. ACT
        const result = registerUser(name, email, age);

        // 3. ASSERT
        expect(result.age).toBe(19);
    });

    test('should succeed when email contains exactly one @ sign', () => {
        // 1. ARRANGE
        const name = 'User';
        const email = 'user@domain.com';
        const age = 25;

        // 2. ACT
        const result = registerUser(name, email, age);

        // 3. ASSERT
        expect(result.email).toBe('user@domain.com');
    });

    // ──────────────────────────────────────────────────────
    // EDGE CASES
    // ──────────────────────────────────────────────────────

    test('should pass name check for a name that is only spaces (truthy string)', () => {
        // 1. ARRANGE — spaces are truthy so !name is false; function does NOT throw on name
        const name = '   ';
        const email = 'user@example.com';
        const age = 20;

        // 2. ACT & ASSERT
        const result = registerUser(name, email, age);
        expect(result.name).toBe('   ');
    });

    test('should pass email check when email is exactly "@" (contains @)', () => {
        // 1. ARRANGE — the check is only .includes('@'); "@" satisfies it
        const name = 'Edge';
        const email = '@';
        const age = 20;

        // 2. ACT
        const result = registerUser(name, email, age);

        // 3. ASSERT
        expect(result.email).toBe('@');
    });

    test('should succeed for very long valid inputs', () => {
        // 1. ARRANGE
        const name = 'A'.repeat(200);
        const email = 'a'.repeat(100) + '@' + 'b'.repeat(100) + '.com';
        const age = 99;

        // 2. ACT
        const result = registerUser(name, email, age);

        // 3. ASSERT
        expect(result.name).toBe(name);
        expect(result.email).toBe(email);
        expect(result.age).toBe(99);
    });

    test('should treat name check before email check (error priority)', () => {
        // 1. ARRANGE — both name AND email are invalid
        const name = '';
        const email = 'noemail';
        const age = 20;

        // 2. ACT & ASSERT — name error fires first
        expect(() => registerUser(name, email, age)).toThrow('Name required');
    });

    test('should treat email check before age check (error priority)', () => {
        // 1. ARRANGE — both email AND age are invalid
        const name = 'John';
        const email = 'noemail';
        const age = 10;

        // 2. ACT & ASSERT — email error fires before age error
        expect(() => registerUser(name, email, age)).toThrow('Invalid email');
    });

    // Using test.each for comprehensive positive registration scenarios
    test.each([
        ['Alice', 'alice@example.com', 18, { name: 'Alice', email: 'alice@example.com', age: 18 }],
        ['Bob', 'bob@mail.org', 25, { name: 'Bob', email: 'bob@mail.org', age: 25 }],
        ['Charlie', 'charlie@qa.io', 100, { name: 'Charlie', email: 'charlie@qa.io', age: 100 }]
    ])('registerUser("%s", "%s", %i) should return correct object', (name, email, age, expected) => {
        expect(registerUser(name, email, age)).toEqual(expected);
    });

    // Using test.each for all throwing scenarios
    test.each([
        ['', 'a@b.com', 20, 'Name required', "empty name"],
        [null, 'a@b.com', 20, 'Name required', "null name"],
        ['John', 'invalidemail', 20, 'Invalid email', "no @ in email"],
        ['John', 'a@b.com', 17, 'Must be 18 or older', "age 17"],
        ['John', 'a@b.com', 0, 'Must be 18 or older', "age 0"],
        ['John', 'a@b.com', -1, 'Must be 18 or older', "negative age"]
    ])('registerUser("%s", "%s", %i) should throw "%s" (%s)', (name, email, age, errorMsg) => {
        expect(() => registerUser(name, email, age)).toThrow(errorMsg);
    });
});
