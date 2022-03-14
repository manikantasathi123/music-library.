const Sequelize =require('sequelize');

const sequelize = require('../database/database');

const songs = sequelize.define('songs',{id:{type:Sequelize.INTEGER,primaryKey:true,autoIncrement:true,allowNull:false},
                                                   name:{type:Sequelize.STRING,unique:true,allowNull:false},
                                                   length:{type:Sequelize.TIME,allowNull:false},
                                                   composers:{type:Sequelize.STRING,allowNull:false},
                                                   singers:{type:Sequelize.STRING,allowNull:false},
                                                   lyricists:{type:Sequelize.STRING,allowNull:false},
                                                   albumId:{type:Sequelize.INTEGER,forignkey:true,allowNull:false}
}
);

module.exports = songs;