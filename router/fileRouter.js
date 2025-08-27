const fileController = require("../controllers/file-controller");
const fileRouter = (router) => {

    const
        {
            uploadReviewFiles,
            upload,
            getListFiles,
            download,
        } = fileController;
    router.post("/upload", upload);
    router.post("/uploadrwf", uploadReviewFiles);
    router.get("/files/:user", getListFiles);
    router.get("/file/:name", download);
}

module.exports = fileRouter;