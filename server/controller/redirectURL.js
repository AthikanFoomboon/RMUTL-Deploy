const ItemsSchema = require('../models/Items');

exports.redirectURL = async function(req, res, id) {
    try {
        const setCount = await ItemsSchema.findById(id);
    
        if (setCount) {
            setCount.count = setCount.count ? setCount.count + 1 : 1; // เพิ่ม 1 ถ้า count มีค่าอยู่แล้ว หรือกำหนดค่าเป็น 1หากยังไม่มีค่า
            await setCount.save();
            res.redirect(setCount.urlDefault);
        } else {
            res.status(404).send("The product link is no longer available 🛒❌");
        }
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send("Internal Server Error");
    }
};
