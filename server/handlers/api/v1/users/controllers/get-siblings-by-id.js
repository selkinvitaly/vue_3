const { getPrevSiblingByUuid, getNextSiblingByUuid } = require('../../../../../modules/fake-users');


module.exports = async ctx => {
    const { id } = ctx.params;
    const prevUser = getPrevSiblingByUuid(id);
    const nextUser = getNextSiblingByUuid(id);

    ctx.response.body = {
        prev: prevUser ? prevUser.uuid : null,
        next: nextUser ? nextUser.uuid : null
    };
};
