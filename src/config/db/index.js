const mongoose = require("mongoose");
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Wed-Ban-Hang', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('connect successfully');
    } catch (error) {
        console.log('fail');
    }
}
module.exports = {connect};