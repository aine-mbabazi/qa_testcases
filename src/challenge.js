function registerUser(name, email, age) {
    if (!name) throw new Error('Name required');
    if (!email.includes('@')) throw new Error('Invalid email');
    if (age < 18) throw new Error('Must be 18 or older');
    return { name, email, age };
}

module.exports = { registerUser };
