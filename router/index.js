const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const applicationController = require('../controllers/application-controller');
const fileController = require('../controllers/file-controller');
const specialityController = require('../controllers/speciality-controller');
const smetaController = require('../controllers/smeta-controller');
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
router.get('/ausersll', authMiddleware, userController.getAllUsers);
router.get('/users/:id', authMiddleware, userController.getOne);
router.get('/uscheck', authMiddleware, userController.checkUser);
router.post('/rightupd', authMiddleware, userController.updateRights)
router.post('/usrupd', authMiddleware, userController.updatePrimeData)
router.get('/userdel/:id', authMiddleware, userController.deleteUser)
router.get('/superadmn', userController.checkIsSuperAdmin);
router.post('/changedel', authMiddleware, userController.changeIsDeleted);
router.post('/application', authMiddleware, applicationController.create);
router.get('/applications', authMiddleware, applicationController.getAll);
router.get('/applications/:id', authMiddleware, applicationController.getOne);
router.get('/appls/', authMiddleware, applicationController.getByLetter);
router.post('/updappl/', authMiddleware, applicationController.updateappl);
router.post('/updman/', authMiddleware, applicationController.updateManager);
router.post('/changedeloptn/', authMiddleware, applicationController.changeCheckupPlaceDeleteOption);
router.get('/applicationdel/:id', authMiddleware, applicationController.deleteApplication)
router.post("/upload", fileController.upload);
router.get("/files/:user", fileController.getListFiles);
router.get("/file/:name", fileController.download);
router.post("/docspec", authMiddleware, specialityController.create);
router.get("/docspecs", authMiddleware, specialityController.getAll);
router.get('/docspecs/:id', authMiddleware, specialityController.deleteSpeciality)
router.get('/smetas', authMiddleware, smetaController.getAll);
router.get('/smetas/:id', authMiddleware, smetaController.getOne);
router.post('/smetas-mkrd', authMiddleware, smetaController.updateSmeta);
module.exports = router
