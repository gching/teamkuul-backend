// video.js
var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res) {
  res.send({
    video: 'true'
  });
});

module.exports = router;
