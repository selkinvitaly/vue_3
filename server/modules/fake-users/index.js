const uuid = require('node-uuid').v4;


let users = [{
    uuid: '9d4b3485-f663-4323-9a30-dc970f07dcaa',
    email: 'test@email.com',
    titleName: 'miss',
    firstName: 'Lucy',
    lastName: 'Simons',
    phone: '(904)-886-6860',
    birthday: '10.12.1990',
    biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porttitor auctor tincidunt. Quisque quis justo eget leo sollicitudin placerat in sit amet risus. Donec cursus magna vitae semper luctus. Nulla nisi justo, iaculis at mauris vel, molestie sagittis augue. Ut gravida tortor neque, at semper orci fermentum pharetra. Suspendisse facilisis sodales scelerisque. Donec dolor ipsum, rhoncus sit amet nibh a, egestas interdum justo. Duis velit velit, elementum suscipit tristique at, tristique sed ex. Etiam eget lacinia nulla. Maecenas in ullamcorper magna.',
    avatarUrl: 'https://randomuser.me/api/portraits/med/women/2.jpg'
}, {
    uuid: '128a2d2f-e239-4142-a578-069cd8ac54cb',
    email: 'test2@email.com',
    titleName: 'mrs',
    firstName: 'Peppi',
    lastName: 'Salo',
    phone: '04-994-092',
    birthday: '11.12.1990',
    biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porttitor auctor tincidunt. Quisque quis justo eget leo sollicitudin placerat in sit amet risus. Donec cursus magna vitae semper luctus. Nulla nisi justo, iaculis at mauris vel, molestie sagittis augue. Ut gravida tortor neque, at semper orci fermentum pharetra. Suspendisse facilisis sodales scelerisque. Donec dolor ipsum, rhoncus sit amet nibh a, egestas interdum justo. Duis velit velit, elementum suscipit tristique at, tristique sed ex. Etiam eget lacinia nulla. Maecenas in ullamcorper magna.',
    avatarUrl: 'https://randomuser.me/api/portraits/med/women/28.jpg'
}, {
    uuid: '1f8a66e4-c005-444f-b60e-34de9f4f025b',
    email: 'test3@email.com',
    titleName: 'ms',
    firstName: 'Sophie',
    lastName: 'Kim',
    phone: '02-1202-5143',
    birthday: '12.12.1990',
    biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porttitor auctor tincidunt. Quisque quis justo eget leo sollicitudin placerat in sit amet risus. Donec cursus magna vitae semper luctus. Nulla nisi justo, iaculis at mauris vel, molestie sagittis augue. Ut gravida tortor neque, at semper orci fermentum pharetra. Suspendisse facilisis sodales scelerisque. Donec dolor ipsum, rhoncus sit amet nibh a, egestas interdum justo. Duis velit velit, elementum suscipit tristique at, tristique sed ex. Etiam eget lacinia nulla. Maecenas in ullamcorper magna.',
    avatarUrl: 'https://randomuser.me/api/portraits/med/women/43.jpg'
}, {
    uuid: 'e7e9f6f3-879c-45fc-84ea-9ad074241392',
    email: 'test4@email.com',
    titleName: 'ms',
    firstName: 'فاطمه',
    lastName: 'محمدخان',
    phone: '091-53432658',
    birthday: '13.12.1990',
    biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porttitor auctor tincidunt. Quisque quis justo eget leo sollicitudin placerat in sit amet risus. Donec cursus magna vitae semper luctus. Nulla nisi justo, iaculis at mauris vel, molestie sagittis augue. Ut gravida tortor neque, at semper orci fermentum pharetra. Suspendisse facilisis sodales scelerisque. Donec dolor ipsum, rhoncus sit amet nibh a, egestas interdum justo. Duis velit velit, elementum suscipit tristique at, tristique sed ex. Etiam eget lacinia nulla. Maecenas in ullamcorper magna.',
    avatarUrl: null
}, {
    uuid: 'ef1f6cec-0c74-4a57-bac3-af98d2140158',
    email: 'test5@email.com',
    titleName: 'miss',
    firstName: 'Erin',
    lastName: 'Perkins',
    phone: '061-482-9000',
    birthday: '14.12.1990',
    biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porttitor auctor tincidunt. Quisque quis justo eget leo sollicitudin placerat in sit amet risus. Donec cursus magna vitae semper luctus. Nulla nisi justo, iaculis at mauris vel, molestie sagittis augue. Ut gravida tortor neque, at semper orci fermentum pharetra. Suspendisse facilisis sodales scelerisque. Donec dolor ipsum, rhoncus sit amet nibh a, egestas interdum justo. Duis velit velit, elementum suscipit tristique at, tristique sed ex. Etiam eget lacinia nulla. Maecenas in ullamcorper magna.',
    avatarUrl: 'https://randomuser.me/api/portraits/med/women/67.jpg'
}, {
    uuid: 'ef1f6cec-1c74-4a57-bac3-af98d2140158',
    email: 'test6@email.com',
    titleName: 'miss',
    firstName: 'Jenny',
    lastName: 'Jane',
    phone: '051-482-7000',
    birthday: '15.12.1990',
    biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porttitor auctor tincidunt. Quisque quis justo eget leo sollicitudin placerat in sit amet risus. Donec cursus magna vitae semper luctus. Nulla nisi justo, iaculis at mauris vel, molestie sagittis augue. Ut gravida tortor neque, at semper orci fermentum pharetra. Suspendisse facilisis sodales scelerisque. Donec dolor ipsum, rhoncus sit amet nibh a, egestas interdum justo. Duis velit velit, elementum suscipit tristique at, tristique sed ex. Etiam eget lacinia nulla. Maecenas in ullamcorper magna.',
    avatarUrl: 'https://randomuser.me/api/portraits/med/women/68.jpg'
}, {
    uuid: 'ef1f6cec-1c74-4a57-bac3-bc68d2140158',
    email: 'test6@email.com',
    titleName: 'ms',
    firstName: 'Alex',
    lastName: 'Brown',
    phone: '061-482-7000',
    birthday: '16.12.1990',
    biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porttitor auctor tincidunt. Quisque quis justo eget leo sollicitudin placerat in sit amet risus. Donec cursus magna vitae semper luctus. Nulla nisi justo, iaculis at mauris vel, molestie sagittis augue. Ut gravida tortor neque, at semper orci fermentum pharetra. Suspendisse facilisis sodales scelerisque. Donec dolor ipsum, rhoncus sit amet nibh a, egestas interdum justo. Duis velit velit, elementum suscipit tristique at, tristique sed ex. Etiam eget lacinia nulla. Maecenas in ullamcorper magna.',
    avatarUrl: 'https://randomuser.me/api/portraits/med/women/69.jpg'
}, {
    uuid: '9d4b3484-h663-4323-9a30-dc970f07dcaa',
    email: 'test7@email.com',
    titleName: 'ms',
    firstName: 'Vannesa',
    lastName: 'Sanders',
    phone: '(304)-886-6860',
    birthday: '17.12.1990',
    biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porttitor auctor tincidunt. Quisque quis justo eget leo sollicitudin placerat in sit amet risus. Donec cursus magna vitae semper luctus. Nulla nisi justo, iaculis at mauris vel, molestie sagittis augue. Ut gravida tortor neque, at semper orci fermentum pharetra. Suspendisse facilisis sodales scelerisque. Donec dolor ipsum, rhoncus sit amet nibh a, egestas interdum justo. Duis velit velit, elementum suscipit tristique at, tristique sed ex. Etiam eget lacinia nulla. Maecenas in ullamcorper magna.',
    avatarUrl: 'https://randomuser.me/api/portraits/med/women/3.jpg'
}, {
    uuid: '2d4b3484-h663-4323-9a30-dc970f07dcaa',
    email: 'test8@email.com',
    titleName: 'ms',
    firstName: 'Rannesa',
    lastName: 'Gevora',
    phone: '(204)-886-6860',
    birthday: '18.12.1990',
    biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porttitor auctor tincidunt. Quisque quis justo eget leo sollicitudin placerat in sit amet risus. Donec cursus magna vitae semper luctus. Nulla nisi justo, iaculis at mauris vel, molestie sagittis augue. Ut gravida tortor neque, at semper orci fermentum pharetra. Suspendisse facilisis sodales scelerisque. Donec dolor ipsum, rhoncus sit amet nibh a, egestas interdum justo. Duis velit velit, elementum suscipit tristique at, tristique sed ex. Etiam eget lacinia nulla. Maecenas in ullamcorper magna.',
    avatarUrl: 'https://randomuser.me/api/portraits/med/women/4.jpg'
}, {
    uuid: '4d4b2484-h663-4323-9a30-dc970f07dcaa',
    email: 'test9@email.com',
    titleName: 'miss',
    firstName: 'Brannesa',
    lastName: 'Nevora',
    phone: '(104)-886-6860',
    birthday: '19.12.1990',
    biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porttitor auctor tincidunt. Quisque quis justo eget leo sollicitudin placerat in sit amet risus. Donec cursus magna vitae semper luctus. Nulla nisi justo, iaculis at mauris vel, molestie sagittis augue. Ut gravida tortor neque, at semper orci fermentum pharetra. Suspendisse facilisis sodales scelerisque. Donec dolor ipsum, rhoncus sit amet nibh a, egestas interdum justo. Duis velit velit, elementum suscipit tristique at, tristique sed ex. Etiam eget lacinia nulla. Maecenas in ullamcorper magna.',
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
