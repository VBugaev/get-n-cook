module.exports = (router) => {
   let sql = require('mssql');
   let pool = require('../../db.js');

   router.route('/users')
      .get((req, res, next) => {
         pool.then(pool => {
            return pool.request()
               .execute('GetAllUsers');
         }).then(result => {
            res.send(result.recordset);
         })
            .catch(err => {
               pool.close();
               res.status(500).send('Internal server error');
            });
      });
}