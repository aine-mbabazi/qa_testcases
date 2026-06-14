const { createUser, addToCart, findUser } = require('../src/level3');

// QUESTION 7: USER CREATION TESTS
describe('createUser Function - Object Creation', () => {
    
    test('should create user object with correct name and age', () => {
        // 1. ARRANGE
        const name = "John";
        const age = 25;
        
        // 2. ACT
        const result = createUser(name, age);
        
        // 3. ASSERT
        expect(result).toEqual({
            name: "John",
            age: 25
        });
    });

    test('should return an object (not an array or primitive)', () => {
        // 1. ARRANGE
        const name = "Jane";
        const age = 30;
        
        // 2. ACT
        const result = createUser(name, age);
        
        // 3. ASSERT
        expect(typeof result).toBe('object');
        expect(Array.isArray(result)).toBe(false);
        expect(result).not.toBeNull();
    });

    test('should create user with different name and age values', () => {
        // Test with multiple inputs
        const testCases = [
            { name: "Alice", age: 28, expected: { name: "Alice", age: 28 } },
            { name: "Bob", age: 35, expected: { name: "Bob", age: 35 } },
            { name: "Charlie", age: 42, expected: { name: "Charlie", age: 42 } }
        ];
        
        testCases.forEach(({ name, age, expected }) => {
            expect(createUser(name, age)).toEqual(expected);
        });
    });

    test('should handle empty string as name', () => {
        // 1. ARRANGE
        const name = "";
        const age = 20;
        
        // 2. ACT
        const result = createUser(name, age);
        
        // 3. ASSERT
        expect(result).toEqual({ name: "", age: 20 });
    });

    test('should handle zero age', () => {
        // 1. ARRANGE
        const name = "Baby";
        const age = 0;
        
        // 2. ACT
        const result = createUser(name, age);
        
        // 3. ASSERT
        expect(result).toEqual({ name: "Baby", age: 0 });
    });

    test('should handle negative age (edge case)', () => {
        // 1. ARRANGE
        const name = "Invalid";
        const age = -5;
        
        // 2. ACT
        const result = createUser(name, age);
        
        // 3. ASSERT
        expect(result).toEqual({ name: "Invalid", age: -5 });
    });

    // Using test.each for cleaner testing
    test.each([
        ["John", 25, { name: "John", age: 25 }],
        ["Sarah", 32, { name: "Sarah", age: 32 }],
        ["", 0, { name: "", age: 0 }],
        ["Mike", 100, { name: "Mike", age: 100 }]
    ])('createUser("%s", %i) should return %o', (name, age, expected) => {
        expect(createUser(name, age)).toEqual(expected);
    });

    test('should return a new object each time (not referencing same object)', () => {
        const user1 = createUser("John", 25);
        const user2 = createUser("John", 25);
        
        // They should have the same properties
        expect(user1).toEqual(user2);
        
        // But they should be different objects in memory
        expect(user1).not.toBe(user2);
    });
});

// QUESTION 8: SHOPPING CART TESTS
describe('addToCart Function - Array Manipulation', () => {
    
    test('should add item to empty cart', () => {
        // 1. ARRANGE
        const emptyCart = [];
        const newItem = "apple";
        
        // 2. ACT
        const result = addToCart(emptyCart, newItem);
        
        // 3. ASSERT
        expect(result).toEqual(["apple"]);
        expect(result).toHaveLength(1);
        expect(result).toContain("apple");
    });

    test('should add item to cart with existing items', () => {
        // 1. ARRANGE
        const cart = ["apple", "banana"];
        const newItem = "orange";
        
        // 2. ACT
        const result = addToCart(cart, newItem);
        
        // 3. ASSERT
        expect(result).toEqual(["apple", "banana", "orange"]);
        expect(result).toHaveLength(3);
        expect(result[2]).toBe("orange");
    });

    test('should allow duplicate items in cart', () => {
        // 1. ARRANGE
        const cart = ["apple", "banana"];
        const newItem = "apple";  // Duplicate of existing item
        
        // 2. ACT
        const result = addToCart(cart, newItem);
        
        // 3. ASSERT
        expect(result).toEqual(["apple", "banana", "apple"]);
        expect(result).toHaveLength(3);
        expect(result.filter(item => item === "apple")).toHaveLength(2); // Two apples
    });

    test('should handle adding multiple items one by one', () => {
        // 1. ARRANGE
        let cart = [];
        
        // 2. ACT
        cart = addToCart(cart, "item1");
        cart = addToCart(cart, "item2");
        cart = addToCart(cart, "item3");
        
        // 3. ASSERT
        expect(cart).toEqual(["item1", "item2", "item3"]);
        expect(cart).toHaveLength(3);
    });

    test('should not modify the original cart (immutability)', () => {
        // 1. ARRANGE
        const originalCart = ["apple", "banana"];
        const originalCartCopy = [...originalCart];
        const newItem = "orange";
        
        // 2. ACT
        const result = addToCart(originalCart, newItem);
        
        // 3. ASSERT
        expect(originalCart).toEqual(originalCartCopy); // Original unchanged
        expect(originalCart).not.toBe(result); // Different array reference
        expect(result).toEqual(["apple", "banana", "orange"]);
    });

    test('should handle adding objects to cart', () => {
        // 1. ARRANGE
        const cart = [];
        const item1 = { id: 1, name: "Laptop", price: 999 };
        const item2 = { id: 2, name: "Mouse", price: 25 };
        
        // 2. ACT
        const result1 = addToCart(cart, item1);
        const result2 = addToCart(result1, item2);
        
        // 3. ASSERT
        expect(result2).toHaveLength(2);
        expect(result2[0]).toEqual(item1);
        expect(result2[1]).toEqual(item2);
    });

    test('should handle adding numbers to cart', () => {
        const cart = [1, 2, 3];
        const result = addToCart(cart, 4);
        expect(result).toEqual([1, 2, 3, 4]);
    });

    test('should handle adding null or undefined', () => {
        const cart = [];
        
        expect(addToCart(cart, null)).toEqual([null]);
        expect(addToCart(cart, undefined)).toEqual([undefined]);
    });

    // Using test.each for comprehensive testing
    test.each([
        [[], "item", ["item"]],
        [["a"], "b", ["a", "b"]],
        [["x", "y"], "z", ["x", "y", "z"]],
        [[1, 2], 3, [1, 2, 3]]
    ])('addToCart(%j, %s) should return %j', (cart, item, expected) => {
        expect(addToCart(cart, item)).toEqual(expected);
    });
});

// QUESTION 9: FIND USER BY ID TESTS
describe('findUser Function - Array Search', () => {
    
    // Sample users array for testing
    const users = [
        { id: 1, name: "Alice", age: 25 },
        { id: 2, name: "Bob", age: 30 },
        { id: 3, name: "Charlie", age: 35 }
    ];

    test('should return user object when user exists', () => {
        // 1. ARRANGE
        const userId = 2;
        
        // 2. ACT
        const result = findUser(users, userId);
        
        // 3. ASSERT
        expect(result).toEqual({ id: 2, name: "Bob", age: 30 });
        expect(result).toBeDefined();
        expect(result.id).toBe(2);
        expect(result.name).toBe("Bob");
    });

    test('should return undefined when user does not exist', () => {
        // 1. ARRANGE
        const userId = 999; // Non-existent ID
        
        // 2. ACT
        const result = findUser(users, userId);
        
        // 3. ASSERT
        expect(result).toBeUndefined();
        expect(result).not.toBeDefined();
    });

    test('should return first matching user when duplicate IDs exist', () => {
        // 1. ARRANGE
        const usersWithDuplicates = [
            { id: 1, name: "First John" },
            { id: 1, name: "Second John" }, // Duplicate ID
            { id: 2, name: "Alice" }
        ];
        
        // 2. ACT
        const result = findUser(usersWithDuplicates, 1);
        
        // 3. ASSERT
        expect(result).toEqual({ id: 1, name: "First John" }); // Returns first match
    });

    test('should handle empty array', () => {
        // 1. ARRANGE
        const emptyUsers = [];
        const userId = 1;
        
        // 2. ACT
        const result = findUser(emptyUsers, userId);
        
        // 3. ASSERT
        expect(result).toBeUndefined();
    });

    test('should find user with different ID types (string IDs)', () => {
        // 1. ARRANGE
        const usersWithStringIds = [
            { id: "abc123", name: "Alice" },
            { id: "def456", name: "Bob" }
        ];
        
        // 2. ACT
        const result = findUser(usersWithStringIds, "def456");
        
        // 3. ASSERT
        expect(result).toEqual({ id: "def456", name: "Bob" });
    });

    test('should return undefined when searching with wrong ID type', () => {
        // 1. ARRANGE
        const users = [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" }
        ];
        
        // 2. ACT - searching with string when IDs are numbers
        const result = findUser(users, "1");
        
        // 3. ASSERT
        expect(result).toBeUndefined(); // "1" !== 1
    });

    test('should handle array with different object structures', () => {
        // 1. ARRANGE
        const mixedUsers = [
            { id: 1, username: "alice", email: "alice@test.com" },
            { id: 2, fullName: "Bob", phone: "123-456" },
            { id: 3, userId: 3, name: "Charlie" } // Different property name
        ];
        
        // 2. ACT
        const result1 = findUser(mixedUsers, 1);
        const result2 = findUser(mixedUsers, 2);
        
        // 3. ASSERT
        expect(result1).toEqual({ id: 1, username: "alice", email: "alice@test.com" });
        expect(result2).toEqual({ id: 2, fullName: "Bob", phone: "123-456" });
    });

    // Using test.each for comprehensive testing
    describe('with different user arrays', () => {
        const testUsers = [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" },
            { id: 3, name: "Charlie" }
        ];

        test.each([
            [testUsers, 1, { id: 1, name: "Alice" }],
            [testUsers, 2, { id: 2, name: "Bob" }],
            [testUsers, 3, { id: 3, name: "Charlie" }],
            [testUsers, 999, undefined],
            [[], 1, undefined]
        ])('findUser(%j, %i) should return %j', (users, id, expected) => {
            expect(findUser(users, id)).toEqual(expected);
        });
    });

    test('should handle large array efficiently', () => {
        // Create large array of users
        const largeUsers = [];
        for (let i = 1; i <= 1000; i++) {
            largeUsers.push({ id: i, name: `User${i}` });
        }
        
        // Test finding first user
        expect(findUser(largeUsers, 1)).toEqual({ id: 1, name: "User1" });
        
        // Test finding middle user
        expect(findUser(largeUsers, 500)).toEqual({ id: 500, name: "User500" });
        
        // Test finding last user
        expect(findUser(largeUsers, 1000)).toEqual({ id: 1000, name: "User1000" });
        
        // Test finding non-existent user
        expect(findUser(largeUsers, 1001)).toBeUndefined();
    });
});