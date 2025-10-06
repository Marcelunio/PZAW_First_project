import { Path } from "./path.js";
import { readFileSync } from "node:fs";

const index_html =readFileSync("static/index.html")
const favicon =readFileSync("static/favicon.ico")
const pathConfigs =[new Path("/",["GET"],"text/html",index_html),
new Path("/favicon.ico",["GET"],"image/x-icon",favicon)]

export function handlePath(path,req,res)
{
    for(let config of pathConfigs)
    {
        if(path==config.path)
        {
            if(config.allowed_methods.includes(req.method))
            {
                config.handler(req,res);
            }
            else
            {
                res.writeHead(405, { "Content-Type": "text/plain" });
                res.end("Metoda nie jest dozwolona\n");
            }
        }
    }
}