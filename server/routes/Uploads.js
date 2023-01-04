const express = require('express');
const {uploading,upload,getImages,getImage} =require('../controllers/uploadController');

const router = express.Router();

router.post('/upload',upload.single('file'),uploading);
router.get('/',getImages);
router.get('/:imgId',getImage);

module.exports = router;