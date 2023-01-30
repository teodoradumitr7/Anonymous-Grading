const express = require('express')
const {Sequelize} = require('sequelize')

const sequelize=new Sequelize('dbgrade','root','',{
  host:'localhost',
  dialect:'mysql'
})

//sequelize.sync({ force: true });

const connect = () => {
    sequelize.authenticate()
    .then(() => console.log('S a conectat!'))
    .catch((err) => console.warn(err));
};



const User = require('../models/user_model')(sequelize, Sequelize);
const Project = require('../models/project_model')(sequelize, Sequelize);
const Grade=require('../models/grade_model')(sequelize,Sequelize);
//User.hasMany(Project);

module.exports = { connect, User, Project,Grade };