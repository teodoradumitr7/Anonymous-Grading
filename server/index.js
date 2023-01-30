require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connect } = require('./config/dbConfig');
const register_route = require('./routes/register_route');
const login_route = require('./routes/login_route');
const users_route = require('./routes/users_route');
const projects_route = require('./routes/project_route');
const grade_route=require('./routes/grade_route');
const app = express();

//se va realiza conexiunea la baza de date
connect();

app.use(express.json());
app.use(cors());

// rutele principale
app.use('/register', register_route);
app.use('/login', login_route);
app.use('/users', users_route);
app.use('/projects', projects_route);
app.use('/grades',grade_route);

const port = process.env.PORT || 8090;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});