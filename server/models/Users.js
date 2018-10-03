module.exports = (sequelize, Sequelize) => {  
  const Users = sequelize.define('Users', {
    Id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    Name: {
      type: Sequelize.STRING,
      required: true
    },
    Login: {
      type: Sequelize.STRING,
      required: true
    },
    Email: {
      type: Sequelize.STRING,
      required: true
    },
    RoleId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    ImageId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    PasswordId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    AboutSection: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    }
  });
  return Users;
};