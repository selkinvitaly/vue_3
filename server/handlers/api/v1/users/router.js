const Router = require('koa-router');

const getAllUsersController  = require('./controllers/get-all-users');
const getUserByIdController  = require('./controllers/get-user-by-id');
const getSiblingsByIdController = require('./controllers/get-siblings-by-id');
const updateUserByIdController = require('./controllers/update-user-by-id');
const createNewUserController = require('./controllers/create-new-user');
const deleteUserByIdController = require('./controllers/delete-user-by-id');

const router = new Router();


router.get('/api/v1/users', getAllUsersController);
router.get('/api/v1/users/:id', getUserByIdController);
router.get('/api/v1/users/:id/siblings', getSiblingsByIdController);
router.put('/api/v1/users/:id', updateUserByIdController);
router.post('/api/v1/users', createNewUserController);
router.delete('/api/v1/users/:id', deleteUserByIdController);

module.exports = router;
