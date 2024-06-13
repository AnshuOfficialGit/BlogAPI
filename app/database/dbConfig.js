const mongoose = require('mongoose');
require('dotenv').config()
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE, {
        });
        console.log(`Connected with database successfully!`);

        console.log("\x1b[33m%s\x1b[0m", "Press Ctrl+C to stop the server")
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
module.exports = connectDB;