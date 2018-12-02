module.exports = (router) => {
    let imagesDAL = require('./dal.js'),
        multer = require('multer'),
        storage = multer.memoryStorage(),
        upload = multer({ storage: storage });

    router.route('/images')
        .get((req, res, next) => {
            imagesDAL.getImageById(req.body.id)
                .then(result => {
                    res.contentType(result.MIMEType);
                    res.send(result.BinaryData);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        })
        .post(upload.single('image'), (req, res, next) => {
            const normalizedObj = {
                buffer: req.file.buffer,
                originalname: req.file.originalname,
                mimetype: req.file.mimetype
            };

            imagesDAL.uploadImage(normalizedObj)
                .then(result => {
                    res.contentType(result.MIMEType);
                    res.send(result.BinaryData);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        })
        .delete((req, res, next) => {
            imagesDAL.deleteImage(req.body.id)
                .then(() => {
                    res.status(202).send('Deleted');
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
}