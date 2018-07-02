const { removeByUuid, getByUuid } = require('../../../../../modules/fake-users');


module.exports = async ctx => {
    const uuid = ctx.params.id;

    if (!getByUuid(uuid)) {
        ctx.status = 404;
        ctx.body = {
            error: 'user with this uuid not found!'
        };
        return;
    }

    removeByUuid(uuid);

    ctx.status = 204;
};
