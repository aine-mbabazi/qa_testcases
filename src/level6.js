function withdraw(balance, amount) {
    if (amount <= 0) {
        throw new Error('Invalid amount');
    }
    if (amount > balance) {
        throw new Error('Insufficient funds');
    }
    return balance - amount;
}

function transfer(balance, amount) {
    if (amount < 10) {
        throw new Error('Minimum transfer is 10');
    }
    if (amount > balance) {
        throw new Error('Insufficient balance');
    }
    return balance - amount;
}

module.exports = { withdraw, transfer };
