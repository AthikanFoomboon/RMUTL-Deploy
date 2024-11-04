
const fs = require('fs')
const ItemsSchema = require('../models/Items');
const { createURL } = require('./createURL');

exports.create = async (req, res) => {
    try {
        const { formData } = req.body;
        const file = req.file;

        console.log(file)

        const newData = {
            itemsData: JSON.parse(formData),
            picture: file ? file.filename : null
        };
        console.log(newData.picture);
        if (!newData.itemsData) {
            console.log('ไม่พบข้อมูลที่ส่งมา');
            return res.status(406).json({ error: 'ชื่อสินค้าไม่ถูกต้อง' });
        }

        const url = await createURL(newData.itemsData)  //สร้างURL
        newData.itemsData.picture = newData.picture
        newData.itemsData.newURL = url
        newData.itemsData.queue = 0
        newData.itemsData.count = 0


        const newItem = new ItemsSchema(newData.itemsData);

        await newItem.save();

        res.json({ msg: 'บันทึกข้อมูลเรียบร้อย' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'มีบางอย่างผิดพลาด' });
    }
};


exports.list = async (req, res) => {
    const { group } = req.body;
    let items = {};

    if (group === 'all') {
        items = await ItemsSchema.find({}).sort({ createdAt: -1 });
    } else {
        items = await ItemsSchema.find({ Group: group }).sort({ createdAt: -1 });
    }

    res.json({ items });
}

exports.listAll_Product = async (req, res) => {

    try {
        const data = await ItemsSchema.find({});
        const count = await ItemsSchema.aggregate([
            {
                $group: {
                    _id: null,
                    total_count: { $sum: "$count" }
                }
            }
        ]);

        const group = await ItemsSchema.distinct('Group');
        const list = {
            Group: group.length,
            Items: data.length,
            Count: count.length > 0 ? count[0].total_count : 0
        };

        console.log(list);
        res.json(list);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};



exports.read = async (req, res) => {
    const items = await ItemsSchema.findOne({ _id: req.params.id })
    res.json(items);
}

exports.update = async (req, res) => {
    const { formData } = req.body;
    const file = req.file;

    const newData = {
        itemsData: JSON.parse(formData),
        picture: file ? file.filename : null
    };

    try {
        const updated = await ItemsSchema.findByIdAndUpdate(
            { _id: req.params.id },
            newData.itemsData,
            { new: true }
        );

        if (newData.picture) {
            // ลบไฟล์รูปเก่า ถ้ามี
            if (updated.picture) {
                fs.unlink(`./uploads/${updated.picture}`, (err) => {
                    if (err) {
                        console.error('Error deleting old picture:', err);
                    } else {
                        console.log('Old picture deleted');
                    }
                });
            }
            // อัปเดตข้อมูลรูปภาพใน itemsData
            updated.picture = newData.picture;
        }

        await updated.save();
        res.json(updated);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error updating item', error: err });
    }
};


let deleteURL = null; // เก็บ URL ที่ต้องการลบ

exports.remove = async (req, res) => {
    try {
        const removedItem = await ItemsSchema.findOneAndDelete({ _id: req.params.id });
        if (removedItem) {
            deleteURL = removedItem.newURL;

            await fs.unlink(`./uploads/${removedItem.picture}`, (err) => {  //ลบไฟล์
                console.log(err);
            })
            res.json(removedItem);
        } else {
            res.status(404).json({ error: "Item not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.removeURL = async function () {
    try {
        const urlToDelete = deleteURL; // เก็บค่า URL ที่ต้องการลบ
        deleteURL = null; // เซ็ตค่า deleteURL เป็น null หลังจากการ return
        return urlToDelete;
    } catch (err) {
        console.log(err);
        throw err; // โยนข้อผิดพลาดเมื่อเกิดข้อผิดพลาด
    }
};

