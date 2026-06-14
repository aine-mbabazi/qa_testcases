// Level 3: Objects and Arrays

// Question 7: User Creation

function createUser(name, age) {
 return {
   name,
   age
 };
}

// Shopping Cart

function addToCart(cart, item) {
 return [...cart, item];
}

// Find User by ID
function findUser(users, id) {
 return users.find(user => user.id === id);
}

module.exports = {createUser, addToCart, findUser};