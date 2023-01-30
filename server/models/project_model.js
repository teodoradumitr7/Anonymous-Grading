module.exports =(sequelize,DataTypes)=>{
    return sequelize.define("Project", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false },
  video:{type: DataTypes.STRING},
  username: {
    type: DataTypes.STRING,
    defaultValue: null
}
});

};
