const Sequelize = require('sequelize');
const sequelize = new Sequelize('GetncookDB', 'debug', 'debug',  {
    host: '127.0.0.1',
    port: 1703,
    dialect: 'mssql',
    dialectOptions: {
      encrypt: true
    },
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

// Connect all the models/tables in the database to a db object, 
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//Models/tables
db.users = require('./models/Users.js')(sequelize, Sequelize);  
db.recipes = require('./models/Recipes.js')(sequelize, Sequelize);

//Relations
// db.posts.hasMany(db.comments); 
// db.comments.belongsTo(db.posts); //this relationships order: on delete - cascade
db.recipes.belongsTo(db.users); 
db.users.hasMany(db.recipes); //this relationships order: on delete - no action 

module.exports = db; 