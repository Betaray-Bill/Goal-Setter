const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("DB Connected");
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = connectDB