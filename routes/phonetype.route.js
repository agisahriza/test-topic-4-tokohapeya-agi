const express = require('express')
const router = express.Router()
const { Get, Insert, Update, Delete } = require('../controller/phonetype.controller')

router.get('/', Get)
router.post('/', Insert)
router.put('/:id', Update)
router.delete('/:id', Delete)
module.exports = router