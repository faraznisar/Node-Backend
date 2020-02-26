const express = require('express')

const router = express.Router()

router.get('/:users', (req, res, next) => {

    res.json({ message: 'User Route Works' })
})

module.exports = router