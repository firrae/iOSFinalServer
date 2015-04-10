var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cronJob = require('cron').CronJob;
var request = require('request');
var mongoose = require('mongoose');
var db = require('./db');

var Bridge = require('./schemas/bridge');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('error', {
        message: err.message,
        error: {}
    });
});

new cronJob('*/10 * * * * *', function() {
    request.get('http://www.cbsa-asfc.gc.ca/bwt-taf/bwt-eng.csv', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var csv = body.toString();
            console.log(new Date());
            var csvArray = csv.split('\n');
            for (var i = 1; i < csvArray.length - 1; i++) {
                var subSplit = csvArray[i].split(';; ');
                var bridgeObj = new Bridge({
                    customsOffice: subSplit[0],
                    location: subSplit[1],
                    lastUpdated: subSplit[2],
                    canCommercialFlow: subSplit[3],
                    usCommercialFlow: subSplit[4],
                    canTravellersFlow: subSplit[5],
                    usTravellersFlow: subSplit[6]
                });

                bridgeObj.save(function(err, bridge) {
                    if(err)
                        console.log(err);

                    console.log(bridge);
                });
            }
        }
    });
}, null, true, "America/Los_Angeles");

module.exports = app;
