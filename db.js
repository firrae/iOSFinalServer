/**
 * Created by Steven Lambe on 2015-04-10.
 */

var mongoose = require('mongoose');

mongoose.connect('mongodb://myUser:doubleDown@ds061741.mongolab.com:61741/bridges', function() {
    console.log('Database connected')
});

module.exports = mongoose;