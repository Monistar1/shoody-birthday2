const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const WISHES_FILE = path.join(__dirname, 'wishes.json');

if (!fs.existsSync(WISHES_FILE)) {
    fs.writeFileSync(WISHES_FILE, JSON.stringify({ wishes: [] }, null, 2));
}

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    if (req.url === '/api/wishes' && req.method === 'GET') {
        fs.readFile(WISHES_FILE, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: 'Failed to read' }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
        return;
    }
    
    if (req.url === '/api/wishes' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const wishData = JSON.parse(body);
                
                fs.readFile(WISHES_FILE, 'utf8', (err, data) => {
                    const wishes = JSON.parse(data || '{"wishes":[]}');
                    
                    wishes.wishes.push({
                        ...wishData,
                        id: Date.now()
                    });
                    
                    fs.writeFile(WISHES_FILE, JSON.stringify(wishes, null, 2), err => {
                        if (err) {
                            res.writeHead(500);
                            res.end(JSON.stringify({ error: 'Failed to save' }));
                            return;
                        }
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ success: true }));
                    });
                });
            } catch (e) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Invalid data' }));
            }
        });
        return;
    }
    
    let filePath = path.join(__dirname, req.url === '/' ? 'countdown.html' : req.url);
    const ext = path.extname(filePath);
    const contentTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json'
    };
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('Not found');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});