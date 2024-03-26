






// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// const port = 3000;


// const server = http.createServer(function(req, res) {
//     if (req.url === '/' || req.url === '/index.html') {
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         const filePath = path.join(__dirname, '..', 'index.html');
//         fs.readFile(filePath, function(error, data) {
//             if (error) {
//                 res.writeHead(404);
//                 res.write('Error: File not found');
//             } else {
//                 res.write(data);
//             }
//             res.end();
//         });
//     } else if (req.url === '/styles/styles.css') {
//         res.writeHead(200, {'Content-Type': 'text/css'});
//         const filePath = path.join(__dirname, '..', 'styles', 'styles.css');
//         fs.readFile(filePath, function(error, data) {
//             if (error) {
//                 res.writeHead(404);
//                 res.write('Error: File not found');
//             } else {
//                 res.write(data);
//             }
//             res.end();
//         });
//     } else if (req.url === '/scripts/index.js') {
//         res.writeHead(200, {'Content-Type': 'text/javascript'});
//         const filePath = path.join(__dirname, '..', 'scripts', 'index.js');
//         fs.readFile(filePath, function(error, data) {
//             if (error) {
//                 res.writeHead(404);
//                 res.write('Error: File not found');
//             } else {
//                 res.write(data);
//             }
//             res.end();
//         });
//     } else if (req.url.startsWith('/assets/')) {
//         const assetPath = path.join(__dirname, '..', req.url);
//         const contentType = getContentType(req.url);
//         fs.readFile(assetPath, function(error, data) {
//             if (error) {
//                 res.writeHead(404);
//                 res.write('Error: File not found');
//             } else {
//                 res.writeHead(200, {'Content-Type': contentType});
//                 res.write(data);
//             }
//             res.end();
//         });
//     } else {
//         res.writeHead(404);
//         res.write('Error: File not found');
//         res.end();
//     }
// });

// server.listen(port, function(error){
//     if(error){
//         console.log('Coś poszło nie tak!', error)
//     } else{
//         console.log('Server is listening on port ' + port);
//     }
// })



// function getContentType(url) {
//     const extension = path.extname(url);
//     switch(extension) {
//         case '.jpg':
//         case '.jpeg':
//             return 'image/jpeg';
//         case '.png':
//             return 'image/png';
//         case '.gif':
//             return 'image/gif';
//         default:
//             return 'application/octet-stream';
//     }
// }

