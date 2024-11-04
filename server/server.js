const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// ตั้งค่าการแสดงผล views และใช้ view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'eje');
app.use('/img', express.static('uploads'))
app.use(express.json())

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// เชื่อมต่อฐานข้อมูล
mongoose.connect(process.env.DATABASE)
    .then(() => console.log('=>Connected to Database','🍻'))
    .catch((err) => console.log('=>Error connecting to Database:', err));

// อ่าน directory routes เพื่อ require routes ทุกไฟล์
fs.readdirSync('./routes').forEach(file => {
    if (file.endsWith('.js')) {
        const routePath = path.join(__dirname, 'routes', file);
        const route = require(routePath);
        app.use('/api', route);
    }
})

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("=>Server running on Port: ", port,'🌈'));
