const mongoose = require("mongoose");

const URI = 'mongodb://127.0.0.1/Blog';

const coonnectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Connection successful to database');
    } catch (error) {
        console.log(error);
        console.log('Connection database faile');
    }
}


module.exports = coonnectDB;