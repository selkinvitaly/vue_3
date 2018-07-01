const { isAuth, getUserByToken } = require('../credentials');


module.exports = async ctx => {
    const token = ctx.headers.authorization;

    if (!token || !isAuth(token)) {
        ctx.status = 401;
        return;
    }

    ctx.body = getUserByToken(token);
};
