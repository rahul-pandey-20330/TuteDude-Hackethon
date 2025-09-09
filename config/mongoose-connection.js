const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')('development:mongoose');

mongoose.connect
(`${config.get('MONGOODB_URI')}/tutedude`)
.then(()=>{
    dbgr("Connected to MongoDB successfully!");
})
.catch((err)=>{
    dbgr("Error connecting to MongoDB:", err);
});

module.exports = mongoose.connection;