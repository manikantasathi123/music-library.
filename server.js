  const express = require('express');
 

  const sequelize= require('./database/database');


  const albums= require('./models/albums');

const songs = require('./models/songs');

const albumControllers = require("./controllers/albums");
const songControllers = require("./controllers/songs");
const app = express();

app.use(express.json());


albums.hasMany(songs,{foreignKey:'albumId' });
songs.belongsTo(albums);

sequelize
.sync()
.then((result)=>{
  console.log(result)
}).catch(err=>console.log(err));






  //albums

 app.post("/albums", albumControllers.create);
 app.get("/albums", albumControllers.list);

 app.put("/albums/:albumId", albumControllers.update);
app.delete("/albums/:albumId", albumControllers.deletealbum);

//songs

 app.post("/albums/:albumId/songs", songControllers.create);
 app.get("/songs",songControllers.list);
 app.get("/albums/:albumId/songs/:songId", songControllers.getsongsByalbumId);
 app.patch("/albums/:albumId/songs/:songId", songControllers.update);
 app.delete("/albums/:albumId/songs/:songId", songControllers.deletesong);







       app.listen(3000,()=>{console.log('Server RUnning on 3000')});
  
