const express = require('express')
const router = express.Router()
const { Get, Insert, InsertWithProfile, Update, Delete } = require('../controller/user.controller')
// const { CheckPostReq } = require('../middleware/middleware')

router.get('/', Get)
router.post('/', Insert)
router.post('/profile', InsertWithProfile)
router.put('/:id', Update)
router.delete('/:id', Delete)
module.exports = router