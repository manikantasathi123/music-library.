const albums = require('../models/albums');
const songs = require('../models/songs');

const joi = require('joi');

const schema =joi.object().keys({
          name:joi.string(),
          year:joi.string()

})


const create = (req,res)=>{
  const joierror=schema.validate(req.body);
   if(joierror){
     res.send(joierror.details)
   }else{
    albums.create({
        name:req.body.name,
        year:req.body.year
    }).then((album) =>{
            res.status(200).send(album);
        }).catch(err=>{
          console.log(err);
        });
    };

   }

       const list = (req, res) => {
        albums.findAll({
          include: [
            {
            model:songs

            },
          ],
        }).then((albums) => {
          res.status(200).send(albums);
        }).catch(err=>{
          console.log(err);
        });
      };

      const update = (req, res) => {
        const { albumId } = req.params;
        albums.update(req.body, { where: { id: albumId } }).then(
          ([numOfRowsUpdated]) => {
            if (numOfRowsUpdated === 0) {
              res.status(404).json({ error: "The album does not exist." });
              } else {
              res.status(200).json([numOfRowsUpdated]);
            }
          }
        );
        };

        const deletealbum = (req, res) => {
          const { albumId } = req.params;
          albums.destroy({ where: { id: albumId } }).then(([numOfRowsDeleted]) => {
            if (numOfRowsDeleted === 0) {
              res.status(404).json({ error: "The album does not exist." });
            }
            res.status(204).json([numOfRowsDeleted]);
          });
        };
      module.exports = { create,
         list,
        update, deletealbum
       };