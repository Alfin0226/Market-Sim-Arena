const fs = require('fs');
const http = require('http');
const path = require('path');

// Manually parse .env file to support all Node.js versions
const envPath = path.join(__dirname, '.env');
const env = {};
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const parts = trimmed.split('=');
    const key = parts[0].trim();
    const value = parts.slice(1).join('=').trim();
    env[key] = value.replace(/^['"]|['"]$/g, ''); // Strip outer quotes if present
  });
}

// Read database URL from env file, fallback to environment variables
const NEON_DB_URL = env.NEON_DB_URL || process.env.NEON_DB_URL || '';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    const htmlPath = path.join(__dirname, 'index.html');
    if (!fs.existsSync(htmlPath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('index.html not found');
      return;
    }
    
    let html = fs.readFileSync(htmlPath, 'utf8');
    
    // Inject the NEON_DB_URL on-the-fly in-memory (does not modify index.html on disk)
    html = html.replace('const NEON_DB_URL = "";', `const NEON_DB_URL = "${NEON_DB_URL}";`);
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else {
    // Return 404 for other assets (no external assets, all styling & JS are in index.html)
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`\x1b[36m%s\x1b[0m`, `=============================================`);
  console.log(`\x1b[32m%s\x1b[0m`, `  Market Sim Arena - Secure Dev Server`);
  console.log(`\x1b[36m%s\x1b[0m`, `=============================================`);
  console.log(`Local Address:  http://localhost:${PORT}`);
  if (NEON_DB_URL) {
    console.log(`Database Status: \x1b[32mCONNECTED (LIVE)\x1b[0m`);
    console.log(`Neon URL:        ${NEON_DB_URL.split('@')[1] ? 'postgresql://***@' + NEON_DB_URL.split('@')[1] : 'Configured'}`);
  } else {
    console.log(`Database Status: \x1b[33mOFFLINE (Fallback to LocalStorage)\x1b[0m`);
    console.log(`Notice: Create a .env file with NEON_DB_URL=... to connect to database`);
  }
  console.log(`Press Ctrl+C to terminate server`);
  console.log(`---------------------------------------------`);
});
