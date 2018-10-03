module.exports = (sequelize, Sequelize) => {  
    const Recipes = sequelize.define('Recipes', {
      Id: {
        type: Sequelize.UUID, // char(36)
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      UserId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      Title: {
        type: Sequelize.STRING, //nvarchar(MAX)
        required: true
      },
      // commenter_image_binary: {
      //   type: Sequelize.BLOB  //varbinary(MAX)
      // },
      Description: {
        type: Sequelize.STRING,
        required: true
      },
      Difficulty: {
        type: Sequelize.STRING
      }});
  
    return Recipes;
  };