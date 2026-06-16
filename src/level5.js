function sendWelcomeEmail(emailService, user) {
    emailService.send(user.email, 'Welcome!');
}

async function getUsers(api) {
    return await api.fetchUsers();
}

module.exports = { sendWelcomeEmail, getUsers };
