require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const itemsRouter = require('./controllers/items');
const itemcarsRouter = require('./controllers/itemcars');
const { userExtractor } = require('./middleware/auth');
const logoutRouter = require('./controllers/logout');
const adminRouter = require('./controllers/admin');

(async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI_TEST);
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.log(error);
    }
})()

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Rutas frontend
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/signup', express.static(path.resolve('views', 'signup')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/home', express.static(path.resolve('views', 'homeusu')));
app.use('/blog', express.static(path.resolve('views', 'blog')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/admin', express.static(path.resolve('views', 'admin')));
app.use('/images', express.static(path.resolve('img',)));
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')));

app.use(morgan('tiny'));

// Rutas backend
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/items', itemsRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/admin', userExtractor, adminRouter)
app.use('/api/itemcars',userExtractor, itemcarsRouter);

module.exports = app;