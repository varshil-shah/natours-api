const router = require('express').Router();
const viewController = require('../controllers/view-controller');
const authController = require('../controllers/auth-controller');
const bookingController = require('../controllers/booking-controller');

router.get(
  '/',
  authController.isLoggedIn,
  bookingController.createBookingCheckout,
  viewController.getOverview
);
router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);
router.get('/login', authController.isLoggedIn, viewController.getLoginPage);
router.get('/me', authController.protect, viewController.getAccount);
router.get('/my-tours', authController.protect, viewController.getMyTours);

module.exports = router;
