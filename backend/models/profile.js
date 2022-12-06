module.exports = (sequelize, Sequelize) => {
  const profileSchema = sequelize.define("Profiles", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users", // the table name
        key: "id", // the PK column name
      },
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
    designation: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
    },
    contact_number: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
    },
    dob: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    citizenship_number: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
    },
    pan_number: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
    },
    bank_account: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
    },
    bank_account_number: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
    },
    gender: {
      type: Sequelize.ENUM("Male", "Female", "Others", ""),
      allowNull: false,
      defaultValue: "",
    },
    marital_status: {
      type: Sequelize.ENUM("Married", "Unmarried", ""),
      allowNull: false,
      defaultValue: "",
    },
    profile_pic: {
      type: Sequelize.STRING,
      defaultValue:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    joined_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW,
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
  return profileSchema;
};
