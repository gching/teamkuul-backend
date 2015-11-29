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
var Vuforia = require('vuforia');
var vf = new Vuforia({
  server_secret_key: '0d102d778ec67e52ad0eb0a1a374810609baf670',
  access_key: '16480fda22446f0c4069112c8c53b6b9cfef9a67'
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
    var videoUrl = cloudinary.url(publicId + '.mp4', {resource_type: 'video'});
    var imgUrl = cloudinary.url(publicId + '.jpg', {resource_type: 'video'});

    vf.createTarget({
      name: publicId,
      image: imgUrl,
      width: 64.0,
      application_metadata: videoUrl
    }, function(err, vuforiaResults){
      res.send({
        vf: vuforiaResults,
        video_url: videoUrl,
        img_url: imgUrl
      });
    });

  }, { resource_type: "auto" }
  );


});

module.exports = router;
