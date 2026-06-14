// Sum Function
function sum(a, b) {
 return a + b;
}


// Question 2: Is Adult
function isAdult(age) {
 return age >= 18;
}

// String Reversal
function reverseString(str) {
 return str.split('').reverse().join('');
}

module.exports = {sum, isAdult, reverseString};