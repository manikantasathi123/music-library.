const express = require("express");
const app = express();

const albumControllers = require("./controllers/albums");
const songControllers = require("./controllers/songs");
app.use(express.json());

//album
//app.get('/',albumControllers.Welcome);
app.post("/albums",albumControllers.create);
app.get("/albums", albumControllers.list);

app.put("/albums/:albumId", albumControllers.update);
app.delete("/albums/:albumId", albumControllers.deletealbum);

//songs

app.post("/albums/:albumId/songs", songControllers.create);
app.get("/songs",songControllers.list);
app.get("/albums/:albumId/songs/:songId", songControllers.getsongsByalbumId);
app.put("/albums/:albumId/songs/:songId", songControllers.update);
app.delete("/albums/:albumId/songs/:songId", songControllers.deletesong);


module.exports =app;

