module.exports = (sequelize, Sequelize) => {
  const userSchema = sequelize.define("Users", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    is_admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    department_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "departments", // the table name
        key: "id", // the PK column name
      },
    },
    designation: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    is_password_changed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    last_logged_in: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    createdAt: {
      field: "created_at",
      type: Sequelize.DATE,
      defaultValue: sequelize.fn("NOW"),
      allowNull: false,
    },
    updatedAt: {
      field: "updated_at",
      type: Sequelize.DATE,
      defaultValue: sequelize.fn("NOW"),
      allowNull: false,
    },
  });
  return userSchema;
};
