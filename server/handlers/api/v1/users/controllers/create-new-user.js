const { createNewUser } = require('../../../../../modules/fake-users');


module.exports = async ctx => {
    const { titleName, firstName, lastName, phone, avatarUrl,
        email, birthday, biography
    } = ctx.request.body;

    if (!titleName) {
        ctx.status = 400;
        ctx.body = {
            error: 'missed "titleName" for user!'
        };
        return;
    }

    if (!biography) {
        ctx.status = 400;
        ctx.body = {
            error: 'missed "biography" for user!'
        };
        return;
    }

    if (!birthday) {
        ctx.status = 400;
        ctx.body = {
            error: 'missed "birthday" for user!'
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

    if (!email) {
        ctx.status = 400; 
        ctx.body = {
            error: 'missed "email" for user!'
        };
        return;
    }

    const createdUser = createNewUser({
        titleName, firstName, lastName, phone, avatarUrl, email, birthday, biography
    });

    ctx.status = 201;
    ctx.body = createdUser;
};
