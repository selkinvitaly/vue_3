const credential = [{
    login: 'user-1',
    password: '131dwstwte',
    token: 'sfsvjdsgnidsnkdmkfdn'
}];

const authorizedTokens = [];

function isAuth(token) {
    return authorizedTokens.indexOf(token) !== -1;
}

function getUserByToken(token) {
    return credential.find(u => u.token === token) || null;
}

function signIn(login, pw) {
    const foundUser = credential.find(u => {
        return u.login === login && u.password === pw;
    });

    if (!foundUser) {
        throw new Error('unauthorized');
    }
    authorizedTokens.push(foundUser.token);
    return foundUser.token;
}

function signOut(token) {
    const foundIndex = authorizedTokens.indexOf(token);

    if (foundIndex === -1) {
        return false;
    }

    authorizedTokens.splice(foundIndex, 1);
    return true;
}

module.exports = {
    signIn, signOut, isAuth, getUserByToken
}; 
