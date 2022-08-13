const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const applicationController = require('../controllers/application-controller');
const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.post('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/uscheck', authMiddleware, userController.checkUser);
router.get('/userdel/:id', authMiddleware, userController.deleteUser)
router.get('/superadmn', userController.checkIsSuperAdmin);
router.post('/changedel',authMiddleware, userController.changeIsDeleted);
router.post('/application', authMiddleware, applicationController.create);
router.get('/applications', authMiddleware, applicationController.getAll);
router.get('/applications/:id', authMiddleware, applicationController.getOne);
router.get('/appls/', authMiddleware, applicationController.getByLetter);
router.post('/updappl/', authMiddleware, applicationController.updateappl);
router.get('/applicationdel/:id', authMiddleware, applicationController.deleteApplication)
module.exports = router
