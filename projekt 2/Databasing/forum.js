import { DatabaseSync } from "node:sqlite"

const db_path="./db.sqlite"
const database= new DatabaseSync(db_path)


const database_operations = {

    get_entries: database.prepare("SELECT * FROM entries; "),
    get_entry: database.prepare("SELECT title,body FROM entries WHERE id = ?; "),
    post_entry: database.prepare("INSERT INTO entries(title,body) VALUES (?,?) ")
}

export function postEntry(entry)
{
    if (!entry.hasOwnProperty("body") || !entry.hasOwnProperty("title")){return "brakuje pola"; }
    else {
        if (typeof entry.body != "string"||typeof entry.title != "string")
            return "pola muszą być stringiem";
        else {
            if (  (entry.title.length < 1 || entry.title.length > 50 ))
                return "tytuł nie poprawnej wielkości"
      }
    }
    database_operations.post_entry.run(entry.body,entry.title)
    return true
}

export function getEntries()
{
    
    return database_operations.get_entries.all()
}

export function getEntry(id)
{
 return database_operations.get_entry.get(id)
}

export function hasEntry(id)
{
     return database_operations.get_entry.get(id)!=null
}

export default  {
    getEntries,
    hasEntry,
    getEntry,
    postEntry
}