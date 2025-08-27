const authMiddleware = require("../middlewares/auth-middleware");
const applicationController = require("../controllers/application-controller");
const applicationRouter=(router)=>{
    const {
        changeCheckupPlaceDeleteOption,
        create,
        deleteApplication,
        updateappl,
        updateManager,
        updateDuration,
        updateAbroad,
        createAbroad,
        getAll,
        getByLetter,
        getOne
    } = applicationController
    router.post('/application', authMiddleware, create);
    router.get('/applications', authMiddleware, getAll);
    router.get('/applications/:id', authMiddleware, getOne);
    router.get('/appls/', authMiddleware, getByLetter);
    router.post('/updappl/', authMiddleware, updateappl);
    router.post('/upddur/', authMiddleware, updateDuration);
    router.post('/updman/', authMiddleware, updateManager);
    router.post('/changedeloptn/', authMiddleware, changeCheckupPlaceDeleteOption);
    router.get('/applicationdel/:id', authMiddleware, deleteApplication)
    router.post('/crtabrd/', authMiddleware, createAbroad);
    router.post('/updtabrd/', authMiddleware, updateAbroad);
}

module.exports = applicationRouter;