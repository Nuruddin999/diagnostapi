const Router = require('express').Router;
const specialityController = require('../controllers/speciality-controller');
const analyticsController = require('../controllers/analytics-controller');
const applicationRouter = require('./applicationRouter');
const userRouter = require('./userRouter');
const smetaRouter = require('./smetaRouter');
const fileRouter = require('./fileRouter');
const donationRouter = require('./donationRouter');
const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware');


userRouter(router);
applicationRouter(router);
smetaRouter(router);
fileRouter(router);
donationRouter(router);
router.post("/docspec", authMiddleware, specialityController.create);
router.get("/docspecs", authMiddleware, specialityController.getAll);
router.get('/docspecs/:id', authMiddleware, specialityController.deleteSpeciality)
router.get('/gurec/',authMiddleware,analyticsController.getUsersRecap);
router.get('/gutrec/',authMiddleware,analyticsController.getUsersItemRecap);
module.exports = router
