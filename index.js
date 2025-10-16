const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const router = require('./router/index')
const errorMiddleware = require('./middlewares/error-middleware');
const PORT = process.env.PORT || 5000;
const donationsStatic = require('path').join(__dirname, "uploads")
const http = require('http');

const app = express()
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.MODE ?  ['http://188.68.220.210:3000', 'http://188.68.220.210:12345','http://localhost:3000','http://localhost:3001','http://localhost:9000']:['http://188.68.220.210:3000', 'http://188.68.220.210:12345','http://188.68.220.210:8000'],
}));
app.use("/uploads", express.static(donationsStatic));
app.use('/', router);
app.use(errorMiddleware);
app.use(express.urlencoded({ extended: true }));
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const onlineUsers = new Set();

wss.on('connection', (ws) => {
    let userId = null;

    ws.on('message', (message) => {
        const data = JSON.parse(message);

        if (data.type === 'online') {
            userId = data.id;
            onlineUsers.add(userId);
        }
        if (data.type === 'onlinereq') {
            const userId = data.id

            if (onlineUsers.has(userId)) {
                ws.send(JSON.stringify({
                    type: 'online_status',
                    online: true,
                    id: userId
                }));
            } else {
                ws.send(JSON.stringify({
                    type: 'online_status',
                    online: false,
                    id: userId
                }));
            }

        }
    });
    ws.on('close', () => {
        if (userId) {
            onlineUsers.delete(userId);
            broadcastOnlineUsers();
        }
    });
})


function broadcastOnlineUsers() {
    const usersArray = Array.from(onlineUsers);
    const message = JSON.stringify({ type: 'onlineUsers', users: usersArray });

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}


const start = async () => {
    try {
        server.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
       //  await sequelize.sync({ alter: true })

    } catch (e) {
        console.log(e);
    }
}


start()
