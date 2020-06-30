var http = require('http');
var env = process.env;

var server = http.createServer(function (req, res) {   //create web server
   if (req.url == '/') { //check the URL of the current request
      // set response header
      res.writeHead(200, { 'Content-Type': 'text' }); 
      
      // set response content    
      res.write('Hello World!\n');
      res.write(`HOSTNAME = ${process.env.HOSTNAME}\n`);


      Object.keys(env).forEach(function(key) {
         if (key.startsWith('K8_DEBUG_')) {
            console.log('export ' + key + '="' + env[key] +'"');
            res.write(`${key} = ${env[key]}\n`)
         }
      });
      res.end();
   }
   else if (req.url == "/show-env") {
      // set response header
      res.writeHead(200, { 'Content-Type': 'text' }); 
      
      // set response content    
      res.write('Hello EKS!\n');
  
      Object.keys(env).forEach(function(key) {
         console.log('export ' + key + '="' + env[key] +'"');
         res.write(`${key} = ${env[key]}\n`)
      });
      res.end();
   }
   else
      res.end('Invalid Request!');
});

server.listen(80); // - listen for any incoming requests

console.log('Node.js web server at port 80 is running..')