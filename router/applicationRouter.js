const authMiddleware = require("../middlewares/auth-middleware");
const applicationController = require("../controllers/application-controller");
const applicationRouter=(router)=>{
    router.post('/application', authMiddleware, applicationController.create);
    router.get('/applications', authMiddleware, applicationController.getAll);
    router.get('/applications/:id', authMiddleware, applicationController.getOne);
    router.get('/appls/', authMiddleware, applicationController.getByLetter);
    router.post('/updappl/', authMiddleware, applicationController.updateappl);
    router.post('/upddur/', authMiddleware, applicationController.updateDuration);
    router.post('/updman/', authMiddleware, applicationController.updateManager);
    router.post('/changedeloptn/', authMiddleware, applicationController.changeCheckupPlaceDeleteOption);
    router.get('/applicationdel/:id', authMiddleware, applicationController.deleteApplication)
}

module.exports = applicationRouter;