
// Discount Eligibility
function qualifiesForDiscount(amount) {
 return amount >= 1000;
}

// Username Validation
function isValidUsername(username) {
 return username.length >= 5;
}
// Grade Calculator
function getGrade(score) {
 if(score >= 80) return 'A';
 if(score >= 70) return 'B';
 if(score >= 60) return 'C';
 return 'F';
}
module.exports = {qualifiesForDiscount, isValidUsername, getGrade};