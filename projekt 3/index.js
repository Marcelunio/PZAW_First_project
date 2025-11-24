import express from "express"
import forum, { hasEntry } from './Databasing/forum.js';

const port=8000;

const app=express()
app.set("view engine","ejs")

app.use(express.static("public"))
app.use(express.urlencoded())

app.get("/",(req,res)=>
{
    res.render("Index",{title:"Obiektywnie",entries:forum.getEntries()});
})
app.get("/entries/:post", (req, res) => {

    if(forum.hasEntry(req.params.post))
    {
        const post = forum.getEntry(req.params.post);
        res.render("Entry",{title:`Obiektywnie - ${post.title}`,entry:post, id: req.params.post})
  } else {
    res.sendStatus(404);
  }
});

app.post("/new_entry", (req, res) => { 
    let entry = {
      title: req.body.title,
      body: req.body.body,
    };
    var check_errors=forum.postEntry(entry)
    if(check_errors===true)
    {
        res.redirect(`/`);
    }
    else {
      res.status(400);
      res.render("Index", {
        error: check_errors,
        title: "Obiektywnie",
        entries: forum.getEntries()
      });
    }
  });

app.post("/entries/:post/update",(req,res)=>
{
  let entry_change =
  {
    title: req.body.title,
    body: req.body.body,
  };
  if(hasEntry(req.params.post))
  {
    forum.modifyEntry(req.params.post,entry_change);
    res.redirect("/entries/:post")
  }
  else
  {

  }
})

app.get("/entries/:post/delete",(req,res)=>
{
  if(forum.hasEntry(req.params.post))
  {
    forum.deleteEntry(req.params.post);
    res.redirect('/')
  }
  else
  {
    res.status(400);
      res.render("Index", {
        error: "nie udało się usunąć postu ( on nie istnieje :( )",
        title: "Obiektywnie",
        entries: forum.getEntries()
      });
  }
})


app.get('/entries/',(req,res)=>{res.redirect('/')})

app.listen(port,()=>
{
    console.log(`Serwer na http://localhost:${port}`)
})  