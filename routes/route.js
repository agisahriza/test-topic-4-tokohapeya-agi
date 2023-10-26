const express = require('express')
const router = express.Router()
const userRoute = require('./user.route')
const profileRoute = require('./profile.route')
// const morgan = require('morgan')

// router.use(morgan('dev'))

router.use('/user', userRoute)
router.use('/profile', profileRoute)


module.exports = router