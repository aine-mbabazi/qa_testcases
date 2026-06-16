function divide(a, b) {
    if (b === 0) {
        throw new Error('Cannot divide by zero');
    }
    return a / b;
}

function validatePassword(password) {
    if (password.length < 8) {
        throw new Error('Password too short');
    }
    return true;
}

module.exports = { divide, validatePassword };
