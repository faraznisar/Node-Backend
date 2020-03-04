const express = require('express');
const { check } = require('express-validator')


const placesControllers = require('../controllers/places-controllers')
const router = express.Router();


router.post('/',
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 5 }),
        check('address').not().isEmpty()
    ],
    placesControllers.createPlace)

router.get('/:pid', placesControllers.getPlaceById)
// router.get('/user/:uid', (req, res, next) => {
//     const userId = req.params.uid;
//     const place = DUMMY_PLACES.find(p => {
//         return p.creator === userId
//     })
//     res.json({ place })
// }) 

router.get('/user/:uid', placesControllers.getPlacesByUserId)

router.patch('/:pid',
    [
        check('title').notEmpty(),
        check('description').isLength({ min: 5 }),

    ], placesControllers.updatePlace)
router.delete('/:pid', placesControllers.deletePlace)


module.exports = router