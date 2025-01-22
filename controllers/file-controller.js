const uploadFile = require("../middlewares/upload");
const fs = require("fs");
const baseUrl = "http://188.68.220.210/api/file/";
const {User, ReworkCommentFile} = require('../models');
const uploadFiles = async (req, res) => {
    try {
        await uploadFile(req, res);

        if (!req.file) {
            throw new Error("No file uploaded");
        }
        return {
            originalName: req.file.originalname,
            mimeType: req.file.mimetype,
        };

    } catch (err) {
        console.log(err);

        if (err.code === "LIMIT_FILE_SIZE") {
            err.message = "File size cannot be larger than 2MB!";
            err.statusCode = 400; // Add a custom status code for this error
        }


       throw err;
    }
};

const upload = async (req, res) => {
    try {
        const fileName = await uploadFiles(req, res);
        const user = await User.findOne({where: {id: req.body.userid}})
        const fetchedName = fileName.originalName
        await user.update({urlSignPath: baseUrl + fetchedName, signFileName: fetchedName})
        res.status(200).send({
            message: "Uploaded the file successfully: " + fetchedName,
            urlSignPath: user.urlSignPath,
            signFileName: user.signFileName
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: err.message,
        })
    }
};

const uploadReviewFiles = async (req, res) => {

    try {
        const fileName = await uploadFiles(req, res);
        const {reworkCommentId} = req.body;
        await ReworkCommentFile.create({url:fileName.originalName,reworkCommentId, type:fileName.mimeType})
        res.status(200).send({
            message: "Uploaded the file successfully: " + fileName.originalName,
            fileName,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Some error"
        })
    }
};

const getListFiles = async (req, res) => {
    const user = await User.findOne({where: {id: req.params.user}})
    const directoryPath = "uploads/";

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!",
            });
        }

        let fileInfos = [];

        files.forEach((file) => {
            if (file === user.signFileName) {
                fileInfos.push({
                    name: file,
                });
            }
        });
        res.status(200).send(fileInfos);
    });
};

const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = "uploads/";

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};

const remove = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploads/";

    fs.unlink(directoryPath + fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not delete the file. " + err,
            });
        }

        res.status(200).send({
            message: "File is deleted.",
        });
    });
};

const removeSync = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploads/";

    try {
        fs.unlinkSync(directoryPath + fileName);

        res.status(200).send({
            message: "File is deleted.",
        });
    } catch (err) {
        res.status(500).send({
            message: "Could not delete the file. " + err,
        });
    }
};

module.exports = {
    upload,
    getListFiles,
    download,
    remove,
    removeSync,
    uploadReviewFiles
};