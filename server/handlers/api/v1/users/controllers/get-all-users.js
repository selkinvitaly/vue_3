const toInt = require('lodash/toInteger');

const { getAll } = require('../../../../../modules/fake-users');


module.exports = async ctx => {
    const { skip, limit } = ctx.query;
    let users = getAll();

    if (skip && toInt(skip)) {
        users = users.slice(toInt(skip));
    }

    if (limit && toInt(limit)) {
        users = users.slice(0, toInt(limit));
    }

    ctx.response.body = {
        users,
        total: getAll().length
    };
};
