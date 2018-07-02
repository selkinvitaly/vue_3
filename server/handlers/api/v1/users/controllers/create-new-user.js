const { createNewUser } = require('../../../../../modules/fake-users');


module.exports = async ctx => {
    const { titleName, firstName, lastName, phone, avatarUrl } = ctx.request.body;

    if (!titleName) {
        ctx.status = 400;
        ctx.body = {
            error: 'missed "titleName" for user!'
        };
        return;
    }

    if (!firstName) {
        ctx.status = 400; 
        ctx.body = {
            error: 'missed "firstName" for user!'
        };
        return;
    }

    if (!lastName) {
        ctx.status = 400; 
        ctx.body = {
            error: 'missed "lastName" for user!'
        };
        return;
    }

    if (!phone) {
        ctx.status = 400; 
        ctx.body = {
            error: 'missed "phone" for user!'
        };
        return;
    }

    if (!phone) {
        ctx.status = 400; 
        ctx.body = {
            error: 'missed "phone" for user!'
        };
        return;
    }

    const createdUser = createNewUser({ titleName, firstName, lastName, phone, avatarUrl });

    ctx.status = 201;
    ctx.body = createdUser;
};
