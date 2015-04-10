var express = require('express');
var router = express.Router();
var Bridge = require('../schemas/bridge');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ "test" : "index" });
});

router.get('/bridges', function(req, res, next) {
    //res.json({ "Json" : "Worked" });
    Bridge
        .find()
        .sort( { "update.date" : "desc" } )
        .limit(25)
        .exec(function(err, object) {
            res.json(object);
        });
});

router.get('/bridges/:id', function(req, res) {
    Bridge.findById(req.params.id, function(err, object) {
        if(err)
            res.send(err);

        res.status(200).json(object);
    });
});

router.get('/bridges/name/:name', function(req, res) {
    Bridge.findOne({'customsOffice' : req.params.name}, {}, {sort: {'update' : -1}}, function(err, object) {
        if(err)
            res.send(err);

        res.json(object);
    });
});

router.post('/correct', function(req, res) {
    console.log(req.body.ObjectId);
    console.log(req.body.minutes);
    console.log(req.body.field);

    if(req.body.field == "correctionsCanCommercialFlow") {
        Bridge.findByIdAndUpdate(
            req.body.ObjectId,
            {$push: {correctionsCanCommercialFlow: req.body.minutes}},
            function (err) {
                if (err)
                    res.send(err);

                res.status(200).json({"status":"success"});
            }
        );
    }
    else if(req.body.field == "correctionsUsCommercialFlow")
    {
        Bridge.findByIdAndUpdate(
            req.body.ObjectId,
            {$push: {correctionsUsCommercialFlow: req.body.minutes}},
            function (err) {
                if (err)
                    res.send(err);

                res.status(200).json({"status":"success"});
            }
        );
    }
    else if(req.body.field == "correctionsCanTravellersFlow")
    {
        Bridge.findByIdAndUpdate(
            req.body.ObjectId,
            {$push: {correctionsCanTravellersFlow: req.body.minutes}},
            function (err) {
                if (err)
                    res.send(err);

                res.status(200).json({"status":"success"});
            }
        );
    }
    else if(req.body.field == "correctionsUsTravellersFlow")
    {
        Bridge.findByIdAndUpdate(
            req.body.ObjectId,
            {$push: {correctionsUsTravellersFlow: req.body.minutes}},
            function (err) {
                if (err)
                    res.send(err);

                res.status(200).json({"status":"success"});
            }
        );
    }
});

module.exports = router;
