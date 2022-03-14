const express = require('express'); 
const sequelize =require('./database/database');
const albums = require('./models/albums');
const songs = require('./models/songs');
const app = express();

albums.hasmany(songs);

sequelize
.sync({force:true})
.then((result)=>{
    console.log(result);
})
.catch((err)=>{
    console.log(err);
});

module.exports = app;