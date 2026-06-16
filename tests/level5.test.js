const { sendWelcomeEmail, getUsers } = require('../src/level5');

// QUESTION 12: NOTIFICATION SERVICE TESTS (Mocking)
describe('sendWelcomeEmail Function - Mocking with jest.fn()', () => {

    // POSITIVE TEST CASES
    test('should call emailService.send() when sendWelcomeEmail is invoked', () => {
        // 1. ARRANGE
        const emailService = { send: jest.fn() };
        const user = { email: 'john@example.com', name: 'John' };

        // 2. ACT
        sendWelcomeEmail(emailService, user);

        // 3. ASSERT — send() was called
        expect(emailService.send).toHaveBeenCalled();
    });

    test('should call emailService.send() exactly once', () => {
        // 1. ARRANGE
        const emailService = { send: jest.fn() };
        const user = { email: 'jane@example.com', name: 'Jane' };

        // 2. ACT
        sendWelcomeEmail(emailService, user);

        // 3. ASSERT — called exactly once
        expect(emailService.send).toHaveBeenCalledTimes(1);
    });

    test('should call emailService.send() with the correct email address', () => {
        // 1. ARRANGE
        const emailService = { send: jest.fn() };
        const user = { email: 'alice@example.com', name: 'Alice' };

        // 2. ACT
        sendWelcomeEmail(emailService, user);

        // 3. ASSERT — correct email used as first argument
        expect(emailService.send).toHaveBeenCalledWith('alice@example.com', 'Welcome!');
    });

    test('should call emailService.send() with "Welcome!" as the subject', () => {
        // 1. ARRANGE
        const emailService = { send: jest.fn() };
        const user = { email: 'bob@example.com', name: 'Bob' };

        // 2. ACT
        sendWelcomeEmail(emailService, user);

        // 3. ASSERT — second argument is 'Welcome!'
        const [, subject] = emailService.send.mock.calls[0];
        expect(subject).toBe('Welcome!');
    });

    // NEGATIVE TEST CASES
    test('should NOT call emailService.send() more than once per user', () => {
        // 1. ARRANGE
        const emailService = { send: jest.fn() };
        const user = { email: 'carol@example.com', name: 'Carol' };

        // 2. ACT
        sendWelcomeEmail(emailService, user);

        // 3. ASSERT
        expect(emailService.send).not.toHaveBeenCalledTimes(2);
    });

    test('should NOT send email to a different address than user.email', () => {
        // 1. ARRANGE
        const emailService = { send: jest.fn() };
        const user = { email: 'real@example.com', name: 'Real User' };

        // 2. ACT
        sendWelcomeEmail(emailService, user);

        // 3. ASSERT
        expect(emailService.send).not.toHaveBeenCalledWith('wrong@example.com', expect.anything());
    });

    // EDGE CASES
    test('should handle different users independently with separate mock instances', () => {
        // 1. ARRANGE
        const emailService1 = { send: jest.fn() };
        const emailService2 = { send: jest.fn() };
        const user1 = { email: 'user1@example.com' };
        const user2 = { email: 'user2@example.com' };

        // 2. ACT
        sendWelcomeEmail(emailService1, user1);
        sendWelcomeEmail(emailService2, user2);

        // 3. ASSERT — each service called once with its own user
        expect(emailService1.send).toHaveBeenCalledTimes(1);
        expect(emailService1.send).toHaveBeenCalledWith('user1@example.com', 'Welcome!');
        expect(emailService2.send).toHaveBeenCalledTimes(1);
        expect(emailService2.send).toHaveBeenCalledWith('user2@example.com', 'Welcome!');
    });

    test('should record the correct call arguments in mock.calls', () => {
        // 1. ARRANGE
        const emailService = { send: jest.fn() };
        const user = { email: 'test@example.com' };

        // 2. ACT
        sendWelcomeEmail(emailService, user);

        // 3. ASSERT — inspect the mock call record directly
        expect(emailService.send.mock.calls).toHaveLength(1);
        expect(emailService.send.mock.calls[0][0]).toBe('test@example.com');
        expect(emailService.send.mock.calls[0][1]).toBe('Welcome!');
    });

    // Verify mock resets between tests work correctly
    test('should show 0 calls on a fresh mock before any invocation', () => {
        // 1. ARRANGE
        const emailService = { send: jest.fn() };

        // 2. ACT — nothing called yet

        // 3. ASSERT
        expect(emailService.send).toHaveBeenCalledTimes(0);
        expect(emailService.send).not.toHaveBeenCalled();
    });
});


// QUESTION 13: API CALL TESTS (Async Mocking)
describe('getUsers Function - Async Mocking', () => {

    // POSITIVE TEST CASES
    test('should return the mocked list of users', async () => {
        // 1. ARRANGE
        const mockUsers = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' }
        ];
        const api = { fetchUsers: jest.fn().mockResolvedValue(mockUsers) };

        // 2. ACT
        const result = await getUsers(api);

        // 3. ASSERT
        expect(result).toEqual(mockUsers);
    });

    test('should call api.fetchUsers() exactly once', async () => {
        // 1. ARRANGE
        const api = { fetchUsers: jest.fn().mockResolvedValue([]) };

        // 2. ACT
        await getUsers(api);

        // 3. ASSERT
        expect(api.fetchUsers).toHaveBeenCalledTimes(1);
    });

    test('should return an empty array when API returns no users', async () => {
        // 1. ARRANGE
        const api = { fetchUsers: jest.fn().mockResolvedValue([]) };

        // 2. ACT
        const result = await getUsers(api);

        // 3. ASSERT
        expect(result).toEqual([]);
        expect(result).toHaveLength(0);
    });

    test('should return exactly the data the API provides (no transformation)', async () => {
        // 1. ARRANGE
        const mockUsers = [{ id: 99, name: 'Charlie', role: 'admin' }];
        const api = { fetchUsers: jest.fn().mockResolvedValue(mockUsers) };

        // 2. ACT
        const result = await getUsers(api);

        // 3. ASSERT
        expect(result).toBe(mockUsers);  // Same reference — no copy/transform
    });

    // NEGATIVE TEST CASES
    test('should NOT call fetchUsers() more than once per getUsers() call', async () => {
        // 1. ARRANGE
        const api = { fetchUsers: jest.fn().mockResolvedValue([]) };

        // 2. ACT
        await getUsers(api);

        // 3. ASSERT
        expect(api.fetchUsers).not.toHaveBeenCalledTimes(2);
    });

    test('should propagate API errors to the caller', async () => {
        // 1. ARRANGE
        const api = {
            fetchUsers: jest.fn().mockRejectedValue(new Error('Network error'))
        };

        // 2. ACT & ASSERT
        await expect(getUsers(api)).rejects.toThrow('Network error');
    });

    // BOUNDARY / EDGE CASES
    test('should handle API returning a large dataset', async () => {
        // 1. ARRANGE
        const largeUserList = Array.from({ length: 1000 }, (_, i) => ({ id: i + 1, name: `User${i + 1}` }));
        const api = { fetchUsers: jest.fn().mockResolvedValue(largeUserList) };

        // 2. ACT
        const result = await getUsers(api);

        // 3. ASSERT
        expect(result).toHaveLength(1000);
        expect(api.fetchUsers).toHaveBeenCalledTimes(1);
    });

    test('should handle API returning a single user', async () => {
        // 1. ARRANGE
        const singleUser = [{ id: 1, name: 'Solo User' }];
        const api = { fetchUsers: jest.fn().mockResolvedValue(singleUser) };

        // 2. ACT
        const result = await getUsers(api);

        // 3. ASSERT
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('Solo User');
    });

    test('should call fetchUsers() with no arguments', async () => {
        // 1. ARRANGE
        const api = { fetchUsers: jest.fn().mockResolvedValue([]) };

        // 2. ACT
        await getUsers(api);

        // 3. ASSERT
        expect(api.fetchUsers).toHaveBeenCalledWith();
    });
});
