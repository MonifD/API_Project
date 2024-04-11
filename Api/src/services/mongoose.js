require('dotenv').config();
const mongoose = require('mongoose');



async function connectDb() {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("DB connectée!");
}

module.exports = {
    connectDb,
}