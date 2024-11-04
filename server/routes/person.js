const express = require('express')
const router = express.Router();

const {create,list,read,update,remove, listAll_Product} = require('../controller/person')
const {auth} = require('../middleware/auth')
const {upload} = require('../middleware/uploadFile')

router.get('/listAllProduct',auth,listAll_Product )
router.get('/person/:id',auth,read)
router.post('/person',auth,list )
router.post('/createPerson',auth,upload,create);
router.put('/person/:id',auth,upload,update);
router.delete('/person/:id',auth,remove);

module.exports = router