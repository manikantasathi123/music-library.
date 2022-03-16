
const albums = require('../models/albums');
const songs = require('../models/songs');

const joi = require('joi');

//create songs
const schema = joi.object().keys({
                 name:joi.string(),
                 length:joi.string(),
                 composers:joi.string(),
                 singers:joi.string(),
                 lyricists:joi.string(),
                 
   
});

const create = (req, res)=> {
  const joierr = {
     
     name: req.body.name,
    length: req.body.length,
    composers:req.body.composers,
    singers: req.body.singers,
    lyricists:req.body.lyricists,
    albumId:req.params.albumId,

  }
  const error = schema.validate(joierr);
    if(joierr.error){
      res.send(joierr.error)
    }else{
          songs.create({
            
            name: req.body.name,
            length: req.body.length,
            composers:req.body.composers,
            singers: req.body.singers,
            lyricists:req.body.lyricists,
            albumId:req.params.albumId,
            include:[
              {
                model:albums
              }
            ],
          }).then((songs) => {
            res.status(200).send(songs);
          }).catch(err=>{
            console.log(err);
          });
        };
      }
      //song list
    const list = (req, res) => {
        songs.findAll({
          order:[["createdAt","DESC"]],
          include: [
            {
              model: albums
              
            },
          ],
        }).then((songs) => {
          res.status(200).send(songs);
        }).catch(err=>{
          console.log(err);
        });
      };
    //get songbysongId
      const getsongBysongId = (req, res) => {
        const { songId} = req.params;
            songs.findAll({
              where: { id: songId},
              order:[["createdAt","DESC"]],
              include: [
               {
                  model: albums,
                  
                },
                
                
              ],
            }).then((songs) => {
              res.status(200).send(songs);
            });
          }
      
        //update song
          const  error1 =joi.object().keys({
                              title:joi.string(),
                              length:joi.string(),
                              composers:joi.string(),
                              singers:joi.string(),
                              lyricists:joi.string()

          });
          
      const update = (req, res) => {
             const err ={
        name:req.body.name,
        length:req.body.length,
        composers:req.body.composers,
        singers:req.body.singers,
        lyricists:req.body.lyricists
             }
           const mani = error1.validate(err);
           if(mani.error){
             res.send(mani.error)
           }else{

        const { songId } = req.params;
        songs.update({name:req.body.name,length:req.body.length,composers:req.body.composers,singers:req.body.singers,lyricists:req.body.lyricists,albumId:req.body.albumId} ,{ where: { id: songId } }).then(
          ([numOfRowsUpdated]) => {
            if (numOfRowsUpdated === 0) {
              res.status(404).send({ error: "The song does not exist." });
            } else {
              res.status(200).send([numOfRowsUpdated]);
            }
          }
        );
      };
    }
     //delete song
      const deletesong = (req, res) => {
        const { songId } = req.params;
        songs.destroy({ where: { id: songId } }).then(([numOfRowsDeleted]) => {
          if (numOfRowsDeleted === 0) {
            res.status(404).send({ error: "The song does not exist." });
          }
          res.status(204).send([numOfRowsDeleted]);
        });
      };
    
      module.exports ={create,
        list,
        getsongBysongId,
        update,deletesong
      };