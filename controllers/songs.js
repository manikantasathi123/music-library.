
const albums = require('../models/albums');
const songs = require('../models/songs');


const create = (req, res)=> {
          songs.create({
            
            name: req.body.name,
            length: req.body.length,
            composers:req.body.composers,
            singers: req.body.singers,
            lyricists:req.body.lyricists,
            albumId:req.params.albumId,
          }).then((songs) => {
            res.status(200).send(songs);
          }).catch(err=>{
            console.log(err);
          });
        };
    const list = (req, res) => {
        songs.findAll({
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
      const getsongsByalbumId = (req, res) => {
        const { albumId } = req.params;
            songs.findAll({
              where: { albumId: albumId },
              include: [
               {
                  model: albums,
                  
                },
              ],
            }).then((songs) => {
              res.status(200).send(songs);
            });
          }
      const update = (req, res) => {
        const { songId } = req.params;
        songs.update(req.body, { where: { id: songId } }).then(
          ([rowsUpdated]) => {
            if (rowsUpdated === 0) {
              res.status(404).send({ error: "song does not exist." });
            } else {
              res.status(200).send([rowsUpdated]);
            }
          }
        );
      };

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
        getsongsByalbumId,
        update,deletesong
      };