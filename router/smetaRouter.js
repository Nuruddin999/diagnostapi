const authMiddleware = require("../middlewares/auth-middleware");
const smetaController = require("../controllers/smeta-controller");
const smetaRouter = (router) => {

    const
        {
            getAll,
            getByLetter,
            updateSmetaStatus,
            updateSmeta,
            updateSmetaFields,
            addReworkComment,
            deleteSmeta,
            getOne,
        } = smetaController

    router.get('/smetas', authMiddleware, getAll);
    router.get('/smetas/:id', getOne);
    router.post('/smetas-mkrd', authMiddleware, updateSmeta);
    router.post('/smetas-mkrwc', authMiddleware, addReworkComment);
    router.post('/smetas-mvdir', authMiddleware, updateSmetaStatus);
    router.post('/smetas-upd-f', authMiddleware, updateSmetaFields);
    router.get('/smetasdel/:id', authMiddleware, deleteSmeta)
    router.get('/smts/',authMiddleware, getByLetter);

}

module.exports = smetaRouter;