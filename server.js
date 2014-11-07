var http = require('http');
var fs   = require('fs');
var path = require('path');

http.createServer(function (req, res) {
  var file = path.join(__dirname, req.url);
  if (file !== __filename){
    fs.exists(file, function(exists){
      if (exists){
        fs.stat(file, function(err, stats){
          if (stats.isFile() && !stats.isDirectory()){
            res.writeHead(200);
            var reader = fs.createReadStream(file);
            reader.pipe(res);
          }else{
            res.writeHead(404);
            res.end();
          }
        });
      }else{
        res.writeHead(404);
        res.end();
      }
    });
  }else{
    res.writeHead(403);
    res.end();
  }
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');