const http = require('http');
const os = require('os');
const server = http.createServer((req, resp) => {
    if (req.url === '/') {
        resp.end('heloo');
    }
    if (req.url === '/user') {
        resp.end('heloo vishnu');
    }
    if(req.url === '/os'){
        console.log(os.freemem());
        resp.end(`${os.totalmem()} - ${os.freemem()}`);
    }
});

server.listen('3000', () => console.log('listening to port 3000...'));