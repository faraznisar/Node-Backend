const express = require('express');

const placesControllers = require('../controllers/places-controllers')
const router = express.Router();


router.post('/', placesControllers.createPlace)

router.get('/:pid', placesControllers.getPlaceById)
// router.get('/user/:uid', (req, res, next) => {
//     const userId = req.params.uid;
//     const place = DUMMY_PLACES.find(p => {
//         return p.creator === userId
//     })
//     res.json({ place })
// })

router.get('/user/:uid', placesControllers.getPlacesByUserId)

router.patch('/:pid', placesControllers.updatePlace)
router.delete('/:pid', placesControllers.deletePlace)


module.exports = router