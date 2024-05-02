const express = require("express");
const router = express.Router();
const Rating = require("../models/Rating");
const isLoggedIn = require("../middlewares/userAuth");
const { ObjectId } = require("mongodb");
const searchFile = require('../utils/findFile/findFile')

// route to recive the rating
router.post("/userrating", isLoggedIn, async (req, res) => {
  try {
    const user = req.user.email
    const { rating, bookedPlaces } = req.body;
    console.log(req.body);
    const isUserExist = await Rating.findOne({ user, bookedPlaces });
    if (!isUserExist) {
      const newRating = await Rating.create({
        rating: rating,
        user: user,
        bookedPlaces: new ObjectId(bookedPlaces),
      });
      res
        .status(201)
        .json({ message: "Created", isUserExist: false, data: newRating });
    } else {
      isUserExist.rating = rating
      await Rating.findOneAndUpdate({ user, bookedPlaces }, {$set : isUserExist})
      console.log(isUserExist)
      // res.status(400).send({ error: "User already exists" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// route to send the rating for respective user
router.post("/userrated", isLoggedIn, async (req, res) => {
  try {
    const user = req.user.email
    const { bookedPlaces } = req.body;
    const isPlaceExist = await Rating.findOne({ user, bookedPlaces });
    console.log(isPlaceExist)
    if (isPlaceExist) {
      res.status(200).json(isPlaceExist);
    } else {
      res.status(404).send({ error: "place or user doesnot exist" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// route to get average rating of particualr place
router.get("/avgrating/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const allRating = await Rating.find({ bookedPlaces: id });

    const avg = allRating.reduce((total, rating) => {
      return total + rating.rating;
    }, 0);
    res.status(200).json({ avgRating: avg / allRating.length });
  } catch (error) {
    res.status(500).send({error: error.message})
  }
});


router.get("/findfile", async (req,res) => {
  try {
    const result = await searchFile()
    console.log(result)
    res.json(result)
  } catch (error) {
    res.json(error)
  }
})

module.exports = router;
