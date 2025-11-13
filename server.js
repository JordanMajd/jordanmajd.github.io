const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');

const PORT = 5000;
const HOST = '0.0.0.0';
const ROOT_DIR = path.join(__dirname, 'www');

const server = http.createServer((req, res) => {
  // Remove query string
  let filePath = req.url.split('?')[0];
  
  // Default to index.html for root
  if (filePath === '/') {
    filePath = '/index.html';
  }

  const fullPath = path.join(ROOT_DIR, filePath);

  // Security check - prevent directory traversal
  if (!fullPath.startsWith(ROOT_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(fullPath, (err, stats) => {
    if (err) {
      // File not found - serve 404 page
      const notFoundPath = path.join(ROOT_DIR, '404.html');
      fs.readFile(notFoundPath, (err404, data404) => {
        if (err404) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          res.writeHead(404, { 
            'Content-Type': 'text/html',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          });
          res.end(data404);
        }
      });
      return;
    }

    if (stats.isDirectory()) {
      // Try to serve index.html in directory
      const indexPath = path.join(fullPath, 'index.html');
      fs.readFile(indexPath, (errIndex, dataIndex) => {
        if (errIndex) {
          res.writeHead(404);
          res.end('Not Found');
        } else {
          res.writeHead(200, { 
            'Content-Type': 'text/html',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          });
          res.end(dataIndex);
        }
      });
      return;
    }

    // Serve the file
    fs.readFile(fullPath, (errRead, data) => {
      if (errRead) {
        res.writeHead(500);
        res.end('Internal Server Error');
        return;
      }

      const mimeType = mime.getType(fullPath) || 'application/octet-stream';
      res.writeHead(200, { 
        'Content-Type': mimeType,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(data);
    });
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
  console.log(`Serving files from: ${ROOT_DIR}`);
});
