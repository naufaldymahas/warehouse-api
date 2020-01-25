const multer = require('multer')

const multerStorageConfig = multer.diskStorage({
    destination: (req, files, cb) => {
        cb(null, './uploads/products')
    },

    filename: (req, file, cb) => {
        cb(null, `PRD-${Date.now()}.${file.mimetype.split('/')[1]}`)
    }
})

const filterConfig = (req, file, cb) => {
    if (file.mimetype.split('/')[1] == 'png' || file.mimetype.split('/')[1] == 'jpeg') {
        cb(null, true)
    } else {
        req.validation = {error: true, msg: 'File must be an image'}
        cb(null, false)
    }
}

const upload = multer({
    storage: multerStorageConfig,
    fileFilter: filterConfig
})

module.exports = upload.single('product')