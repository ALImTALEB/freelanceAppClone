import createError from "../utils/createError.js"
import Review from "../models/reviewModel.js"
import Gig from "../models/gigModel.js"

export const createReview = async (req, res, next) => {
    if (req.isSeller) return next(createError(403, "sellers cant create a review"))
    
    const newReview = new Review({
        userId: req.userId,
        gigId: req.body.gigId,
        desc: req.body.desc,
        star: req.body.star
    })
    try {

        const review = await Review.findOne({
            gigId: req.body.gigId,
            userId: req.userId
        })

        if (review) return next(createError(403, "u have already created a review for this gig"))

        const savedReview = await newReview.save()

        await Gig.findByIdAndUpdate(req.body.gigId, 
            {
                $inc: { totalStars: req.body.star, starNumber: 1 }
            })

        res.status(201).send(savedReview)
    } catch (err) {
        next(err)
    }
}

export const getReviews = async (req, res, next) => {
    try {
        const review = await Review.find({
            gigId: req.params.gigId
        })
        
        res.status(200).send(review)

    } catch (err) {
        next(err)
    }
}

export const deleteReview = async (req, res, next) => {
    try {
        
    } catch (err) {
        next(err)
    }
}