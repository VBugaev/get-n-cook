const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  db = require('./db.js'),
  cors = require('cors'),
  nodemailer = require('nodemailer'),
  sql = require('mssql'),
  pool = require('./db.js'),
  router = require('./routerSetup.js');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api', router);

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