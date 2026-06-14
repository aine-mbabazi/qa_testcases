const { qualifiesForDiscount, isValidUsername, getGrade } = require('../src/level2');

// DISCOUNT ELIGIBILITY FUNCTION TESTS (Boundary Testing)
describe('qualifiesForDiscount Function - Boundary Testing', () => {
    
    // EXPLANATION: Why test 999, 1000, 1001?
    // These test the boundary where the condition changes from false to true.
    // 1000 is the exact boundary (amount >= 1000)
    // 999 is just below the boundary (should be false)
    // 1001 is just above the boundary (should be true)
    // This catches off-by-one errors which are very common!

    test('should return false for amount 999 (just below threshold)', () => {
        // 1. ARRANGE
        const amount = 999;
        
        // 2. ACT
        const result = qualifiesForDiscount(amount);
        
        // 3. ASSERT
        expect(result).toBe(false);
    });

    test('should return true for amount 1000 (exact threshold)', () => {
        // 1. ARRANGE
        const amount = 1000;
        
        // 2. ACT
        const result = qualifiesForDiscount(amount);
        
        // 3. ASSERT
        expect(result).toBe(true);
    });

    test('should return true for amount 1001 (just above threshold)', () => {
        // 1. ARRANGE
        const amount = 1001;
        
        // 2. ACT
        const result = qualifiesForDiscount(amount);
        
        // 3. ASSERT
        expect(result).toBe(true);
    });

    // ADDITIONAL BOUNDARY TESTS FOR COMPLETENESS
    
    test('should handle zero amount correctly', () => {
        expect(qualifiesForDiscount(0)).toBe(false);
    });

    test('should handle negative amount correctly', () => {
        expect(qualifiesForDiscount(-100)).toBe(false);
    });

    test('should handle very large amount correctly', () => {
        expect(qualifiesForDiscount(1000000)).toBe(true);
    });

    // Using test.each for cleaner boundary testing
    test.each([
        [999, false, "just below boundary"],
        [1000, true, "exactly on boundary"],
        [1001, true, "just above boundary"]
    ])('amount %i (case: %s) should return %s', (amount, expected) => {
        expect(qualifiesForDiscount(amount)).toBe(expected);
    });
});

// USERNAME VALIDATION FUNCTION TESTS (Boundary Testing)
describe('isValidUsername Function - Boundary Testing', () => {
    
    // EXPLANATION: Why test 4, 5, 6 characters?
    // These test the BOUNDARY where a username becomes valid.
    // 5 characters is the minimum valid length (username.length >= 5)
    // 4 characters is just below the boundary (should be invalid)
    // 6 characters is just above the boundary (should be valid)
    // This ensures the validation logic is correct at the critical point.

    test('should return false for username with 4 characters (just below minimum)', () => {
        // 1. ARRANGE
        const username = "user";
        
        // 2. ACT
        const result = isValidUsername(username);
        
        // 3. ASSERT
        expect(result).toBe(false);
    });

    test('should return true for username with 5 characters (exact minimum)', () => {
        // 1. ARRANGE
        const username = "user1";
        
        // 2. ACT
        const result = isValidUsername(username);
        
        // 3. ASSERT
        expect(result).toBe(true);
    });

    test('should return true for username with 6 characters (just above minimum)', () => {
        // 1. ARRANGE
        const username = "user12";
        
        // 2. ACT
        const result = isValidUsername(username);
        
        // 3. ASSERT
        expect(result).toBe(true);
    });

    // ADDITIONAL BOUNDARY TESTS FOR COMPLETENESS
    
    test('should return false for empty string', () => {
        expect(isValidUsername("")).toBe(false);
    });

    test('should return false for single character', () => {
        expect(isValidUsername("a")).toBe(false);
    });

    test('should return true for very long username (100 characters)', () => {
        const longUsername = "a".repeat(100);
        expect(isValidUsername(longUsername)).toBe(true);
    });

    test('should handle username with spaces correctly', () => {
        expect(isValidUsername("john doe")).toBe(true);
    });

    // Using test.each for comprehensive boundary testing
    test.each([
        ["", false, "empty string"],
        ["a", false, "1 character"],
        ["ab", false, "2 characters"],
        ["abc", false, "3 characters"],
        ["abcd", false, "4 characters (just below)"],
        ["abcde", true, "5 characters (exact boundary)"],
        ["abcdef", true, "6 characters (just above)"],
        ["abcdefghij", true, "10 characters (well above)"]
    ])('username "%s" (length: %d chars) should return %s', (username, expected) => {
        expect(isValidUsername(username)).toBe(expected);
    });
});


// GRADE CALCULATOR FUNCTION TESTS (Boundary Testing)
describe('getGrade Function - Boundary Testing', () => {
    
    // EXPLANATION: Why test 59, 60, 69, 70, 79, 80?
    // These test the BOUNDARIES between grade thresholds:
    // - 59 is just below 'C' threshold (should be 'F')
    // - 60 is exact 'C' threshold (lowest C)
    // - 69 is just below 'B' threshold (highest C)
    // - 70 is exact 'B' threshold (lowest B)
    // - 79 is just below 'A' threshold (highest B)
    // - 80 is exact 'A' threshold (lowest A)
    // This catches off-by-one errors in grade boundaries!

    test('should return "F" for score 59 (just below C threshold)', () => {
        // 1. ARRANGE
        const score = 59;
        
        // 2. ACT
        const result = getGrade(score);
        
        // 3. ASSERT
        expect(result).toBe('F');
    });

    test('should return "C" for score 60 (exact C threshold)', () => {
        // 1. ARRANGE
        const score = 60;
        
        // 2. ACT
        const result = getGrade(score);
        
        // 3. ASSERT
        expect(result).toBe('C');
    });

    test('should return "C" for score 69 (just below B threshold)', () => {
        // 1. ARRANGE
        const score = 69;
        
        // 2. ACT
        const result = getGrade(score);
        
        // 3. ASSERT
        expect(result).toBe('C');
    });

    test('should return "B" for score 70 (exact B threshold)', () => {
        // 1. ARRANGE
        const score = 70;
        
        // 2. ACT
        const result = getGrade(score);
        
        // 3. ASSERT
        expect(result).toBe('B');
    });

    test('should return "B" for score 79 (just below A threshold)', () => {
        // 1. ARRANGE
        const score = 79;
        
        // 2. ACT
        const result = getGrade(score);
        
        // 3. ASSERT
        expect(result).toBe('B');
    });

    test('should return "A" for score 80 (exact A threshold)', () => {
        // 1. ARRANGE
        const score = 80;
        
        // 2. ACT
        const result = getGrade(score);
        
        // 3. ASSERT
        expect(result).toBe('A');
    });

    // ADDITIONAL BOUNDARY TESTS FOR COMPLETENESS
    
    test('should return "F" for score 0 (minimum possible)', () => {
        expect(getGrade(0)).toBe('F');
    });

    test('should return "F" for negative score (edge case)', () => {
        expect(getGrade(-10)).toBe('F');
    });

    test('should return "A" for score 100 (maximum possible)', () => {
        expect(getGrade(100)).toBe('A');
    });

    test('should return "A" for score above 100 (edge case)', () => {
        expect(getGrade(105)).toBe('A');
    });

    // Testing all grade boundaries systematically
    test('should correctly handle all grade boundaries', () => {
        // F grade boundary
        expect(getGrade(59)).toBe('F');
        expect(getGrade(60)).toBe('C');
        
        // C grade boundary
        expect(getGrade(69)).toBe('C');
        expect(getGrade(70)).toBe('B');
        
        // B grade boundary
        expect(getGrade(79)).toBe('B');
        expect(getGrade(80)).toBe('A');
    });

    // Using test.each for comprehensive boundary testing
    test.each([
        [0, 'F', "minimum score"],
        [50, 'F', "well below C"],
        [59, 'F', "just below C boundary"],
        [60, 'C', "exactly on C boundary (lowest C)"],
        [65, 'C', "mid C range"],
        [69, 'C', "just below B boundary (highest C)"],
        [70, 'B', "exactly on B boundary (lowest B)"],
        [75, 'B', "mid B range"],
        [79, 'B', "just below A boundary (highest B)"],
        [80, 'A', "exactly on A boundary (lowest A)"],
        [90, 'A', "high A"],
        [100, 'A', "perfect score"]
    ])('score %i should return "%s" (%s)', (score, expectedGrade) => {
        expect(getGrade(score)).toBe(expectedGrade);
    });
});