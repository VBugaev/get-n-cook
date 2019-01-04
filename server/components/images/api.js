module.exports = (router) => {
    let imagesDAL = require('./dal.js'),
        multer = require('multer'),
        storage = multer.memoryStorage(),
        upload = multer({ storage: storage });

    router.route('/image/:id')
        .get((req, res, next) => {
            imagesDAL.getImageById(req.params.id)
                .then(result => {
                    res.contentType(result.MIMEType);
                    res.send(result.BinaryData);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        })
    router.route('/images')
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
        .put(upload.single('image'), (req, res, next) => {
            const normalizedObj = {
                id: req.body.id,
                buffer: req.file.buffer,
                originalname: req.file.originalname,
                mimetype: req.file.mimetype
            };

            imagesDAL.updateImage(normalizedObj)
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