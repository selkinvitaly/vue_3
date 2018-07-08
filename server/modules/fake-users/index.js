const uuid = require('node-uuid').v4;


let users = [{
    index: 1,
    uuid: '9d4b3485-f663-4323-9a30-dc970f07dcaa',
    email: 'test@email.com',
    titleName: 'miss',
    firstName: 'Lucy',
    lastName: 'Simons',
    phone: '(904)-886-6860',
    avatarUrl: 'https://randomuser.me/api/portraits/med/women/2.jpg'
}, {
    index: 2,
    uuid: '128a2d2f-e239-4142-a578-069cd8ac54cb',
    email: 'test2@email.com',
    titleName: 'mrs',
    firstName: 'Peppi',
    lastName: 'Salo',
    phone: '04-994-092',
    avatarUrl: 'https://randomuser.me/api/portraits/med/women/28.jpg'
}, {
    index: 3,
    uuid: '1f8a66e4-c005-444f-b60e-34de9f4f025b',
    email: 'test3@email.com',
    titleName: 'ms',
    firstName: 'Sophie',
    lastName: 'Kim',
    phone: '02-1202-5143',
    avatarUrl: 'https://randomuser.me/api/portraits/med/women/43.jpg'
}, {
    index: 4,
    uuid: 'e7e9f6f3-879c-45fc-84ea-9ad074241392',
    email: 'test4@email.com',
    titleName: 'ms',
    firstName: 'فاطمه',
    lastName: 'محمدخان',
    phone: '091-53432658',
    avatarUrl: null
}, {
    index: 5,
    uuid: 'ef1f6cec-0c74-4a57-bac3-af98d2140158',
    email: 'test5@email.com',
    titleName: 'miss',
    firstName: 'Erin',
    lastName: 'Perkins',
    phone: '061-482-9000',
    avatarUrl: 'https://randomuser.me/api/portraits/med/women/67.jpg'
}, {
    index: 6,
    uuid: 'ef1f6cec-1c74-4a57-bac3-af98d2140158',
    email: 'test6@email.com',
    titleName: 'miss',
    firstName: 'Jenny',
    lastName: 'Jane',
    phone: '051-482-7000',
    avatarUrl: 'https://randomuser.me/api/portraits/med/women/68.jpg'
}, {
    index: 7,
    uuid: 'ef1f6cec-1c74-4a57-bac3-bc68d2140158',
    email: 'test6@email.com',
    titleName: 'ms',
    firstName: 'Alex',
    lastName: 'Brown',
    phone: '061-482-7000',
    avatarUrl: 'https://randomuser.me/api/portraits/med/women/69.jpg'
}, {
    index: 8,
    uuid: '9d4b3484-h663-4323-9a30-dc970f07dcaa',
    email: 'test7@email.com',
    titleName: 'ms',
    firstName: 'Vannesa',
    lastName: 'Sanders',
    phone: '(304)-886-6860',
    avatarUrl: 'https://randomuser.me/api/portraits/med/women/3.jpg'
}, {
    index: 9,
    uuid: '2d4b3484-h663-4323-9a30-dc970f07dcaa',
    email: 'test8@email.com',
    titleName: 'ms',
    firstName: 'Rannesa',
    lastName: 'Gevora',
    phone: '(204)-886-6860',
    avatarUrl: 'https://randomuser.me/api/portraits/med/women/4.jpg'
}, {
    index: 10,
    uuid: '4d4b2484-h663-4323-9a30-dc970f07dcaa',
    email: 'test9@email.com',
    titleName: 'miss',
    firstName: 'Brannesa',
    lastName: 'Nevora',
    phone: '(104)-886-6860',
    avatarUrl: 'https://randomuser.me/api/portraits/med/women/5.jpg'
}];


exports.getAll = function() {
    return users;
}

exports.getPrevSiblingByUuid = function(uuid) {
    const index = users.findIndex(u => u.uuid === uuid);

    if (index === -1 || index === 0) {
        return null;
    }

    return users[index - 1] || null;
}

exports.getNextSiblingByUuid = function(uuid) {
    const index = users.findIndex(u => u.uuid === uuid);

    if (index === -1 || index === users.length - 1) {
        return null;
    }

    return users[index + 1] || null;
}

exports.getByUuid = function(uuid) {
    return users.find(u => u.uuid === uuid) || null;
}

exports.replaceByUuid = function(uuid, newUser) {
    const indexForFoundUser = users.findIndex(u => u.uuid === uuid);

    if (indexForFoundUser === -1) {
        return;
    }

    users.splice(indexForFoundUser, 1, newUser);
    return newUser;
}

exports.createNewUser = function(userData) {
    const userId = uuid();
    users.push({
        uuid: userId,
        ...userData
    });
    return users.find(u => u.uuid === userId) || null;
}

exports.removeByUuid = function(uuid) {
    return (
        users = users.filter(u => u.uuid !== uuid)
    );
}
