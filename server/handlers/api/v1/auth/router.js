const Router = require('koa-router');

const checkAuthController  = require('./controllers/check-auth');
const signInController  = require('./controllers/sign-in');
const signOutController  = require('./controllers/sign-out');

const router = new Router();


router.get('/api/v1/auth', checkAuthController);
router.post('/api/v1/sign-in', signInController);
router.post('/api/v1/sign-out', signOutController);

module.exports = router;
