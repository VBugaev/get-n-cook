const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  db = require('./db.js'),
  nodemailer = require('nodemailer'),
  router = require('./routes/index'),
  sql = require('mssql');

const app = express();
const PORT = 3000;
const config = {
  user: 'debug',
  password: 'debug',
  server: 'localhost',
  database: 'GetncookDB',

  options: {
    encrypt: true
  }
}

app.use(morgan('combined'));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
});

router(app, db);

app.listen(PORT, () => {
  sql.connect(config).then(pool => {
    return pool.request()
    .execute('GetAllUsers')
  }).then(res => console.log(res))
  .catch(err => {
    console.log(err);
  })



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
});

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