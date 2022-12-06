module.exports = (sequelize, Sequelize) => {
  const leaveSchema = sequelize.define("Leaves", {
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
    reason: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    start_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("Approved", "Rejected", "Pending"),
      defaultValue: "Pending",
    },
    rejected_reason: {
      type: Sequelize.STRING,
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
  return leaveSchema;
};
