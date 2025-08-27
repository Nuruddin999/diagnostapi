const authMiddleware = require("../middlewares/auth-middleware");
const userController = require("../controllers/user-controller");
const {body} = require("express-validator");
const userRouter = (router) => {

    const
        {
            login,
            logout,
            activate,
            refresh,
            getUsers,
            getAllUsers,
            checkUser,
            updateRights,
            updatePrimeData,
            deleteUser,
            checkIsSuperAdmin,
            changeIsDeleted,
            getOne,
            getOneForSmeta,
            saveEndTime,
            saveStartTime,
            userDurationHeartBit,
            registration
        } = userController
    router.post('/registration',
        body('email').isEmail(),
        body('password').isLength({ min: 3, max: 32 }),
        registration
    );
    router.post('/login', login);
    router.post('/logout', logout);
    router.get('/activate/:link', activate);
    router.post('/refresh', refresh);
    router.get('/users', authMiddleware, getUsers);
    router.get('/ausersll', authMiddleware, getAllUsers);
    router.get('/users/:id', authMiddleware, getOne);
    router.get('/uscheck', authMiddleware, checkUser);
    router.post('/rightupd', authMiddleware, updateRights)
    router.post('/usrupd', authMiddleware, updatePrimeData)
    router.get('/userdel/:id', authMiddleware, deleteUser)
    router.get('/superadmn', checkIsSuperAdmin);
    router.post('/changedel', authMiddleware, changeIsDeleted);
    router.get('/smetaureq/:id', getOneForSmeta);
    router.get('/sust/', authMiddleware, saveStartTime);
    router.post('/suet/', authMiddleware, saveEndTime);
    router.post('/usdurhrtbt/', authMiddleware, userDurationHeartBit);
}

module.exports = userRouter;