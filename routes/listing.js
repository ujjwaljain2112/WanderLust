const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const ListingController = require("../controllers/listing.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

// show all listings and create listing
router
    .route("/")
    .get(wrapAsync(ListingController.index))
    .post(isLoggedIn,validateListing,upload.single("listing[image]"),wrapAsync(ListingController.createListing));


// create
router.get("/new",isLoggedIn,ListingController.renderNewForm);
// show listing update listing and delete listing
router
    .route("/:id")
    .get(wrapAsync(ListingController.showListing))
    .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(ListingController.updateListing))
    .delete(isLoggedIn,isOwner,wrapAsync(ListingController.destroyListing));

// create
// router.get("/new",isLoggedIn,ListingController.renderNewForm);

// edit form route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(ListingController.renderEditForm));


module.exports = router;
