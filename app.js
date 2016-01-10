'use strict';
/**
 * Created by hal on 03.01.2016.
 */
var fs= require('fs');
var http = require('http');

http.createServer(function(request, response){
    var newFile = fs.createWriteStream("readme_copy.md");
    var fileBytes = request.headers['content-length'];
    var uploadedBytes = 0;

    request.on('data', function(data){
        var chunk = data;
        uploadedBytes += chunk.length;
        var progress = (uploadedBytes / fileBytes) * 100;
        response.write("progress: " + parseInt(progress, 10) + "%\n");
    });
    request.on('end', function() {
        response.end();
    });

    request.pipe(newFile);
}).listen(8080);