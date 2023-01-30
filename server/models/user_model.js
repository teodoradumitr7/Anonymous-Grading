
module.exports =(sequelize,DataTypes)=>{
  return  sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  surname: { type: DataTypes.STRING, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  type: {type:DataTypes.INTEGER,default:0},
  token: {type:DataTypes.STRING}
});
};


