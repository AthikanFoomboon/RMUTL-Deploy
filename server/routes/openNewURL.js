const express = require('express');
const router = express.Router();
const { getItems } = require('../controller/getItems');
const ItemsSchema = require('../models/Items');
const { redirectURL } = require('../controller/redirectURL');
const { removeURL } = require('../controller/person');

const interval = 3000;

// ฟังก์ชันสำหรับรีเซ็ต URL
const resetURL = async () => {
    try {
        const dataFrom = await getItems();
        await Promise.all(dataFrom.map(async (element) => {
            element.queue = 0;
            await element.save();
        }));
    } catch (err) {
        console.log(err);
    }
};

// ฟังก์ชันสำหรับลบ URL ที่ไม่ใช้แล้ว
const cleanUnusedURLs = async () => {
    try {
        const res = await removeURL();
        if (res !== null) {
            router.stack = router.stack.filter(layer => layer.route.path !== res);
        }
    } catch (err) {
        console.log(err);
    }
};

// ฟังก์ชันสำหรับเริ่มการเปิด URL โดยใช้วิธี 
const startOpenURL = async () => {
    try {
        await cleanUnusedURLs();
        const dataFrom = await getItems();
        await Promise.all(dataFrom.map(async (element) => {
            if (element.queue === 0) {
                const checkQ = await ItemsSchema.findOne({ _id: element._id });

                // ตรวจสอบว่า URL ใหม่ถูกสร้างไว้แล้วหรือยัง
                if (!checkQ.queue) {
                    router.all(element.newURL, (req, res) => {
                        redirectURL(req, res,ele);
                    });

                    checkQ.UpdateURL = `${process.env.URLto}${checkQ.newURL}`; // สร้าง path ใหม่
                    checkQ.queue = 1;
                    await checkQ.save();
                }
            }
        }));
    } catch (error) {
        console.error('Error occurred:', error);
    }

    // เรียกตัวเองอีกครั้งหลังจากผ่านไป 3 วินาที
    setTimeout(startOpenURL, interval);
};

// เริ่มการทำงาน
resetURL().then(() => startOpenURL());

module.exports = router;
