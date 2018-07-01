const { isAuth, getUserByToken, signIn } = require('../credentials');


module.exports = async ctx => {
    const token = ctx.headers.authorization;
    const login = ctx.request.body.login;
    const pw = ctx.request.body.password;

    if (token && isAuth(token)) {
        ctx.body = getUserByToken(token);
        return;
    }

    if (!login || !pw) {
        ctx.status = 401;
        return;
    }

    let authToken = null;

    try {
        authToken = signIn(login, pw);
    } catch (err) {
        ctx.status = 401;
        return;
    }

    ctx.body = getUserByToken(authToken);
};
