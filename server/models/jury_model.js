module.exports=(sequelize,DataTypes)=>{
    return sequelize.define("Jury", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }});
    };
