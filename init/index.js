const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");
const listing = require("../models/listing.js");

let MONGO_URL = "mongodb://127.0.0.1:27017/WanderLust";

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async()=>{
    await listing.deleteMany({});
    initData.data=initData.data.map((obj) => ({...obj,owner:"686a39877f5e757f2c1a334c",}));
    await listing.insertMany(initData.data);
    console.log("data was initialised");
};

initDB();