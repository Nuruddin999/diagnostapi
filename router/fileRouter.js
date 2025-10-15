const fileController = require("../controllers/file-controller");
const fileRouter = (router) => {

    const
        {
            uploadReviewFiles,
            upload,
            getListFiles,
            download,
            uploadDonationFile,
        } = fileController;
    router.post("/upload", upload);
    router.post("/uploadrwf", uploadReviewFiles);
    router.get("/files/:user", getListFiles);
    router.get("/file/:name", download);
    router.post("/uploaddonfile", uploadDonationFile);
}

module.exports = fileRouter;
