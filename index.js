import { createServer } from 'node:http';
import { URL } from "node:url";
import { handlePath } from './path_handlers.js';



const server = createServer((req, res) => {
    const request_url = new URL(`http://${host}${req.url}`)
    const path=request_url.pathname;
    handlePath(request_url.pathname,req,res);

    if (!res.writableEnded) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Strona nie znaleziona :/\n");
  }

});
const port = 8000;
const host = "localhost";

// Start the server
server.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}`)});
