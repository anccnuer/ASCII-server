const http = require('http');

function createAsciiArt() {
  return `
 __   __            ___ _            __   ___            __   __           
\\ \\ / /           |_  (_)           \\ \\ / (_)           \\ \\ / /           
 \\ V /__ _ _ __     | |_ _ __   __ _ \\ V / _  __ _  ___  \\ V / _   _  ___ 
  \\ // _\` | '_ \\    | | | '_ \\ / _\` |/   \\| |/ _\` |/ _ \\ /   \\| | | |/ _ \\
  | | (_| | | | /\\__/ / | | | | (_| / /^\\ \\ | (_| | (_) / /^\\ \\ |_| |  __/
  \\_/\\__,_|_| |_\\____/|_|_| |_|\\__, \\/   \\/_|\\__,_|\\___/\\/   \\/\\__,_|\\___|
                                __/ |                                     
                               |___/                                      
`;
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(createAsciiArt());
});

const port = 8080;
server.listen(port, () => {
  console.log(`字符画服务运行在 http://localhost:${port}`);
});