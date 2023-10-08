const express = require('express');
const router = express.Router({mergeParams: true});
const Review = require('../models/reviews');
const Campground = require('../models/campground');
const reviews = require('../controller/reviews');
const {validateReview,isLoggedIn,isReviewAuthor}= require('../middleware')
const catchAsync = require('../ErrorHandler/catchAsync');
const ExpressError = require('../ErrorHandler/ExpressErrors');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId',isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;
