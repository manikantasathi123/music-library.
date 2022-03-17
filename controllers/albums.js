const albums = require('../models/albums');
const songs = require('../models/songs');
const { sequelize } = require("../models/songs");

const joi = require('joi');


// create  album
 const schema = joi.object().keys({
               name:joi.string(),
               year:joi.number().min(1900).max(2023).required()
 })
const create = async (req,res)=>{
   const joierr = {
     name:req.body.name,
     year:req.body.year
   }
   const error1= schema.validate(joierr);
   if(error1.error){
     res.send(error1.error)

     }
     const a = await sequelize.transaction();
     try{
       const album = await   albums.create({
          
          name:req.body.name,
          year:req.body.year
      },{transaction:a});
     
         await a.commit();
              res.send(album);
          }catch(err){
           await a.rollback()
            console.log(err);
          };
      
      };

    
  //get albumlist
     
    const list = (req, res) => {
        
      albums.findAll({
        order:[["createdAt","DESC"]],
        include: [
          {
          model:songs,

          },
        ],
      }).then((albums) => {
        res.status(200).send(albums);
      }).catch(err=>{
        console.log(err);
      });
    };
//album update
const err = joi.object().keys({
        name:joi.string(),
        year:joi.number().min(1990).max(2022).integer()
})
      const update = (req, res) => {
        const mani ={
          name:req.body.name,
          year:req.body.year
        }
        const schemaerr = err.validate(mani);
        if(schemaerr.error){
          res.send(schemaerr.error);
        }else{
        const { albumId } = req.params;
        albums.update({title:req.body.title,year:req.body.year},{ where: { id: albumId } }).then(
          ([RowsUpdated]) => {
            if (RowsUpdated === 0) {
              res.status(404).json({ error: "The album does not exist." });
              } else {
              res.status(200).json([RowsUpdated]);
            }
          }
        );
        };
      }
      //delete album
        const deletealbum = async (req, res) => {
          try{
          const { albumId } = req.params;
          albums.destroy({ where: { id: albumId } });
              res.status(404).json('deleted');
            } catch(error){
              console.log(error);
            res.status(204).json([numOfRowsDeleted]);
          };
        }

      

    

      module.exports = { create,
         list,
        update, deletealbum
       };