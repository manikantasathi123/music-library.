const Sequelize = require('sequelize');

const connection= new Sequelize('musiclibrary','root','Mani@7702',{dialect:'mysql',host:'localhost'});


module.exports= connection;