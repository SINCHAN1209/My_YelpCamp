const Review = require('../models/reviews');
const Campground = require('../models/campground');

module.exports.createReview = async (req, res) => {
    console.log(req.param)
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Your review was added');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(req.param.reviewId);
    req.flash('success', 'Review was Deleted');
    res.redirect(`/campgrounds/${id}`);
}