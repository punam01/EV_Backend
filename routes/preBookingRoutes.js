const express = require('express');
const router = express.Router();
const { getBookingHistory, createBooking, cancelBooking } = require('../controllers/preBookingController');

router.get('/history/:userId', getBookingHistory);
router.post('/', createBooking);
router.put('/cancel/:bookingId', cancelBooking);

module.exports = router;
