const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  db = require('./db.js'),
  cors = require('cors'),
  nodemailer = require('nodemailer'),
  router = require('./routes/index'),
  sql = require('mssql');

const app = express();
const PORT = 5000;
const config = require('./configs/dbConfig.js').config;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/api/users', (req, res, next) => {
  new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request()
      .execute('GetAllUsers');
  }).then(result => {
    res.send(result.recordset);
    sql.close();
  })
    .catch(err => {
      res.status(500).send('Internal server error');
      sql.close();
    });
});

app.get('/api/roles', (req, res, next) => {
  new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request()
      .execute('GetAllRoles');
  }).then(result => {
    sql.close();
    res.send(result.recordset);
  })
    .catch(err => {
      sql.close();
      res.status(500).send('Internal server error');
    });
});

app.listen(PORT);


  //   let transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //            user: 'vbugaevapps@gmail.com',
  //            pass: 'yuki228322'
  //        }
  //    });
  //    const mailOptions = {
  //     from: 'vbugaevapps@gmail.com', // sender address
  //     to: 'bjaldh@gmail.com', // list of receiverss
  //     subject: 'TEST RUN EMAIL NEWSLETTER', // Subject line
  //     html: '<h1>HELLO! HELLO! HELLO!</h1>'// plain text body
  //   };
  //   transporter.sendMail(mailOptions, function (err, info) {
  //     if(err)
  //       console.log(err)
  //     else
  //       console.log(info);
  //  });
  //     console.log('Express listening on port:', PORT);

//drop and resync with { force: true }
// db.sequelize.sync({ force: true }).then(() => {
//   app.listen(PORT, () => {
  //   let transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //            user: 'vbugaevapps@gmail.com',
  //            pass: 'yuki228322'
  //        }
  //    });
  //    const mailOptions = {
  //     from: 'vbugaevapps@gmail.com', // sender address
  //     to: 'bjaldh@gmail.com', // list of receiverss
  //     subject: 'TEST RUN EMAIL NEWSLETTER', // Subject line
  //     html: '<h1>HELLO! HELLO! HELLO!</h1>'// plain text body
  //   };
  //   transporter.sendMail(mailOptions, function (err, info) {
  //     if(err)
  //       console.log(err)
  //     else
  //       console.log(info);
  //  });
//     console.log('Express listening on port:', PORT);
//   });
// });