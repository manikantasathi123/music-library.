const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const albums = sequelize.define('albums',{ id:{type:Sequelize.INTEGER,primaryKey:true,autoIncrement:true,allowNull:false},
                                                            name:{type:Sequelize.STRING,unique:true,allowNull:false},
                                                          year:{type:Sequelize.INTEGER,allowNull:false}
                                                                 }
);                                                               
 module.exports = albums;                                                      