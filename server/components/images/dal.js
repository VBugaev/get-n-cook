let sql = require('mssql');
let pool = require('../../db.js');

const getImageById = (id) => {
    return pool.then(pool => {
        return pool.request()
        .input('ImageId', sql.UniqueIdentifier, id)
        .execute('GetImageById');
    })
        .then(result => {
            return result.recordset[0];
        })
        .catch(err => {
            pool.close();
            throw err;
        })
};

const uploadImage = (imageData, id = null) => {
    return pool.then(pool => {
        return pool.request()
          .input('Id', sql.UniqueIdentifier, id)
          .input('BinaryData', sql.VarBinary(sql.MAX), imageData.buffer)
          .input('FileName', sql.NVarChar(sql.MAX), imageData.originalname)
          .input('MIMEType', sql.NVarChar(50), imageData.mimetype)
          .execute('CreateImage');
      }).then(result => {
        return result.recordset[0];
      })
        .catch(err => {
          throw err;
        });
};

const updateImage = updObj => {
    return pool.then(pool => {
        return pool.request()
          .input('ImageId', sql.UniqueIdentifier, updObj.id)
          .input('BinaryData', sql.VarBinary(sql.MAX), updObj.buffer)
          .input('FileName', sql.NVarChar(sql.MAX), updObj.originalname)
          .input('MIMEType', sql.NVarChar(50), updObj.mimetype)
          .execute('UpdateImageById');
      }).then(result => {
        return result.recordset[0];
      })
        .catch(err => {
          throw err;
        });
};

const deleteImage = (id) => {
    return pool.then(pool => {
        return pool.request()
          .input('ImageId', sql.UniqueIdentifier, id)
          .execute('DeleteImageById');
      }).then(() => {
        return true;
      })
        .catch(err => {
          throw err;
        });
};

module.exports = {
    getImageById,
    uploadImage,
    deleteImage,
    updateImage
};