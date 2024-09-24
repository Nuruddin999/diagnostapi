const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const { sequelize } = require('./models')
const router = require('./router/index')
const errorMiddleware = require('./middlewares/error-middleware');
const config = require('./config/config');
const PORT = process.env.PORT || 5000;
const root = require('path').join(__dirname, 'build')

const app = express()
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: config.clientURL
}));
app.use(express.static(root))
app.use('/', router);
app.use(errorMiddleware);
app.use(express.urlencoded({ extended: true }));
const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
        await sequelize.sync({ alter: true })
    } catch (e) {
        console.log(e);
    }
}


start()
