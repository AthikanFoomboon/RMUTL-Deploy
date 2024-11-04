const express = require('express');
const mydata = require('../models/dataPersonCMU');
const router = express.Router();

router.post('/data_person', async (req, res) => {
    const { fromData } = req.body;
    console.log('\n>>> Input:',fromData);
 
    try {                                       // รหัสสมาชิก 
        let data_person = await mydata.findOne({ customerId : fromData.toString()});
        console.log(data_person);
        res.json(data_person);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการค้นหาข้อมูล" });
    }
});

module.exports = router;
