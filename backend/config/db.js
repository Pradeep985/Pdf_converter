const mongoose = require('mongoose');
const env = require('./env');

const dbConfig = () => {
    mongoose.connect(env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
};

module.exports = dbConfig;
