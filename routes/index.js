var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ "test" : "index" });
});

router.get('/bridges', function(req, res, next) {
    res.json({ "Json" : "Worked" });
});

module.exports = router;
