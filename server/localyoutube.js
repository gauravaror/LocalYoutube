/*
 * Inspired by: http://stackoverflow.com/questions/4360060/video-streaming-with-html-5-via-node-js
 */
 
var https = require('https'),
    http = require('http'),
    fs = require('fs'),
    util = require('util'),
    tls = require('tls'),
    ytdl = require('ytdl');
var argv = require('minimist')(process.argv.slice(2))

var directory = ".";
if ( argv['dir'] != undefined) {
    directory = argv['dir'];
}
console.log(directory);
var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('key-cert.pem')
};

http.createServer(function (req, res) {
var path = "."+req.url;
if (path == "./undefined.mp4") {
    console.log("Returning 500 undefined format for now, while telling if video exist")
    res.writeHead(500);
    res.end();
    return;
}
var id = req.url.split(".")[0].split("/")[1];
var ytdlurl = "https://www.youtube.com/watch?v="+id
    console.log(path);
    console.log(ytdlurl);
  try {
      stat = fs.statSync(directory+"/"+path);
      var total = stat.size;
      if (total != 0) {
        res.writeHead(200,{'len':total});     
        res.end();
      } 
      else {
        console.log(req);
        downloadFile(req,path,ytdlurl);
        res.writeHead(500);
        res.end();
      }
    
    }
    catch(err) {
       console.log(req);
        downloadFile(req,path,ytdlurl);
        res.writeHead(500);
        res.end();
    }
}).listen(8001);
console.log('Server running at http://127.0.0.1:8001/');

var cleartextStream = https.createServer(options,function (req, res) {
//  var path = 'video.mp4';
var path = "."+req.url;
if (path == "./undefined.mp4") {
    console.log("Returning 500 undefined format for now, while serving the video")
    res.writeHead(500);
    res.end();
    return;
}
  console.log(path);
  var stat;
  try {
      stat = fs.statSync(directory+"/"+path);
  var total = stat.size;
  if (req.headers['range']) {
    nowsend(req,res,path,total);
  } else {
    console.log('ALL: ' + total);
    res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
    fs.createReadStream(directory+"/"+path).pipe(res);
  }
    }
    catch(err) {
        console.log(err);
        console.log('Opened FIle now' );
        downloadFile(req,path);
        setTimeout(letsexecute(req,res,path,total,end),30);
  }
}).listen(8000);

console.log('Server running at https://127.0.0.1:8000/');

downloadFile = function(req,path,ytdlurl) {
    try {
        if (ytdlurl) {
            ytdl(ytdlurl,{ filter: function(format) { return format.container === 'mp4'; }}).pipe(fs.createWriteStream(directory+"/"+path));
        }
        else {
            ytdl(req.headers['referer'],{ filter: function(format) { return format.container === 'mp4'; }}).pipe(fs.createWriteStream(directory+"/"+path));
        }
    }
    catch(err ) {
        console.log("problem downloading the video, lets not stop the script: "+ err);
    }
}   

letsexecute = function(req,res,path,total,end) {
    stat = fs.statSync(directory+"/"+path);
    var end = stat.size;
    console.log("now getting the end: "+end);
    if (req.headers['range']) {
        var total = stat.size;
            nowsend(req,res,path,total,end);    
        }
}

nowsend = function (req,res,path,total,end1){
    var range = req.headers.range;
    var parts = range.replace(/bytes=/, "").split("-");
    var partialstart = parts[0];
    var partialend = parts[1];
 
    var start = parseInt(partialstart, 10);
    var end = partialend ? parseInt(partialend, 10) : total-1;
    var chunksize = (end-start)+1;
    console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);
    console.log('Partial: ' + partialend +' total '+total+' end1 '+ end1);
    var orignaltotal = total
    if (end1) {
        end = partialend;
        total = partialend;
    }
    try {
        if (orignaltotal == 0)  {
            throw new Error("No content to let it go to youtube");
        }
        res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
        var file = fs.createReadStream(directory+"/"+path, {start: start, end: end});
        file.pipe(res);
//        fs.createReadStream(path).pipe(res);
    }
    catch (err) {
        console.log("problem sending downloading file"+ err)
        res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
        fs.createReadStream(directory+"/"+path).pipe(res);
        res.statusCode = 500;
        res.end();
    }
}

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});
