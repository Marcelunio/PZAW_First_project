export class Path
{
    constructor(path,allowed_methods,content_type,content)
    {
        this.path=path;
        this.allowed_methods=allowed_methods;
        this.content_type=content_type;
        this.content=content;
    }
    path;
    allowed_methods;
    content_type;
    content;
    handler = (req,res)=>
    {
        res.writeHead(200,{"Content-Type":this.content_type});
        res.end(this.content)
    }
}