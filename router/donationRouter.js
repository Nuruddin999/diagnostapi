const donationController = require("../controllers/donation-controller");
const donationRouter = (router) => {
    const {
        //changeCheckupPlaceDeleteOption,
        create,
        deleteDonation,
        // updateappl,
        // updateManager,
        // updateDuration,
        // updateAbroad,
        // createAbroad,
        getAll,
        // getByLetter,
        // getOne
    } = donationController
    router.post('/donation', create);
    router.get('/donations', getAll);
    // router.get('/applications/:id', authMiddleware, getOne);
    // router.get('/appls/', authMiddleware, getByLetter);
    // router.post('/updappl/', authMiddleware, updateappl);
    // router.post('/upddur/', authMiddleware, updateDuration);
    // router.post('/updman/', authMiddleware, updateManager);
    // router.post('/changedeloptn/', authMiddleware, changeCheckupPlaceDeleteOption);
    router.get('/donationdel/:id', deleteDonation)
    // router.post('/crtabrd/', authMiddleware, createAbroad);
    // router.post('/updtabrd/', authMiddleware, updateAbroad);
}

module.exports = donationRouter;
