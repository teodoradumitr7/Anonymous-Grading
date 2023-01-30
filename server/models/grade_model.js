module.exports =(sequelize,DataTypes)=>{
    return sequelize.define("Grade", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  grade: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  projectId: {
    type: DataTypes.INTEGER,
    defaultValue: null
}
});

};
