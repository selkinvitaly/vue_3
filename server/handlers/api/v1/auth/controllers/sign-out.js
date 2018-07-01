const { isAuth, signOut } = require('../credentials');


module.exports = async ctx => {
    const token = ctx.headers.authorization;

    if (!token || !isAuth(token)) {
        ctx.status = 204;
        return;
    }

    signOut(token);

    ctx.status = 204;
};
