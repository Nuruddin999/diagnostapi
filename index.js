
const express = require('express');
const cors = require('cors');
const path = require('path')
const cookieParser = require('cookie-parser')
const { sequelize } = require('./models')
const router = require('./router/index')
const errorMiddleware = require('./middlewares/error-middleware');
const PORT = process.env.PORT || 5000;
const root = require('path').join(__dirname, 'build')

const app = express()
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(express.static(root))
app.use('/api', router);
app.use('/*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.use(errorMiddleware);

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
        await sequelize.sync({ alter: true })
    } catch (e) {
        console.log(e);
    }
}

start()
