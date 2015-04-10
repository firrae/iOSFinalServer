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
    correctionsCanCommercialFlow : { type: Array },
    usCommercialFlow : String,
    correctionsUsCommercialFlow : { type: Array },
    canTravellersFlow : String,
    correctionsCanTravellersFlow : { type: Array },
    usTravellersFlow : String,
    correctionsUsTravellersFlow : { type: Array },
    update: { type: Date, default: Date.now },
    likes : Number
});

module.exports = mongoose.model('Bridge', bridge);