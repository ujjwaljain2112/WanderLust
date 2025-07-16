const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    category:{
        type: String,
        enum: ['Trending','Rooms','Iconic cities','Mountains','Castles','Amazing Pools','Camping','Boats','Domes','Farms','Arctic'], 
        required: true
    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await review.deleteMany({_id:{$in: listing.reviews } });
    }
});
const listing = mongoose.model("listing",listingSchema);
module.exports = listing;
