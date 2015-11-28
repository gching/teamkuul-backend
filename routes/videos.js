// video.js
var express = require('express');
var router = express.Router();
var fs = require('fs');
var cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'gavinching',
  api_key: '647891574133533',
  api_secret: 'IurlRqzcOHItdfndsh_ZtiUzg00'
});




router.get('/', function(req, res) {
  res.send({
    video: 'true'
  });
});

router.post('/', function(req, res){
  var params = req.body;
  var id = params.sender_id;
  var video = params.video;
  var send_to_id = params.receiver_id;
  cloudinary.uploader.upload("please4.mp4", function(result){

    var publicId = result.public_id;

    res.send({
      video_url: cloudinary.url(publicId + '.mp4', {resource_type: 'video'}),
      img_url: cloudinary.url(publicId + '.jpg', {resource_type: 'video'})
    });

  }, { resource_type: "auto" }
  );


});

module.exports = router;
