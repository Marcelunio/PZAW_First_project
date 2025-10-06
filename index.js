import { createServer } from 'node:http';
import { URL } from "node:url";
import {readFileSync} from "node:fs";

const index_html =readFileSync("static/index.html")
const favicon =readFileSync("static/favicon.ico")



const server = createServer((req, res) => {
    const request_url = new URL(`http://${host}${req.url}`)
    const path=request_url.pathname;
  


});
const port = 8000;
const host = "localhost";

// Start the server
server.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}`)});
