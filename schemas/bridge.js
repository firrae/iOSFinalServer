/**
 * Created by Steven Lambe on 2015-04-10.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bridge = new Schema({
    customsOffice : String,
    location : String,
    lastUpdated : String,
    canCommercialFlow : String,
    usCommercialFlow : String,
    canTravellersFlow : String,
    usTravellersFlow : String
}, { capped: 10000000000 });

module.exports = mongoose.model('Bridge', bridge);