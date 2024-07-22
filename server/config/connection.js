const mongoose = require('mongoose');

mongoose.connect(process.MONGODB_URI || 'mongodb://localhost:27017/ERStatChecker');

module.exports = mongoose.connection;