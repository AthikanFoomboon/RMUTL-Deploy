const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        const { name, password } = req.body
        // ตรวจสอบว่ามีผู้ใช้ชื่อนี้ในระบบหรือไม่
        const checkUser = await User.findOne({ name })
        if (checkUser) {
            return res.status(400).json({ msg: 'มีผู้ใช้งานอยู่เเล้ว' })
        }

        //สร้่างผู้ใช้ใหม่
        const user = new User({ name, password })

        const salt = await bcryptjs.genSalt(10)
        user.password = await bcryptjs.hash(password, salt)
        user.role = 'admin'
        await user.save()

        const payload = {
            id: user._id.toString(), // แปลง _id ของ MongoDB ให้เป็น string
            name: user.name,
            role: user.role,
        }

        const token = jwt.sign(payload, 'jwtSecret', { expiresIn: 3600 });

        // ส่ง token JWT กลับไปยัง client
        res.json({token});


    } catch (err) {
        console.error(err.message); // บันทึกข้อความ error
        res.status(500).send('เกิดข้อผิดพลาดบนเซิร์ฟเวอร์'); // แจ้ง client ว่าเกิดปัญหาบนเซิร์ฟเวอร์
    }
}

exports.login = async (req, res) => {
    const {name,password} =  req.body

    try{
        const user = await User.findOne({name})
        if(!user){
            return res.status(400).json({ msg: 'ชื่อผู้ใช้ไม่ถูกต้อง' });
        }
         // เปรียบเทียบรหัสผ่านที่ผู้ใช้ป้อนกับรหัสผ่านที่เข้ารหัสไว้
         const isMatch = await bcryptjs.compare(password, user.password);
         if (!isMatch) {
             return res.status(400).json({ msg: 'รหัสผ่านไม่ถูกต้อง' });
         }

         const payload = {
            id: user._id.toString(), // แปลง _id ของ MongoDB ให้เป็น string
            name: user.name,
            role: user.role,
        }

        const token = jwt.sign(payload, 'jwtSecret', { expiresIn: 10600 });

        // ส่ง token JWT กลับไปยัง client
        res.json({ token,payload});

    }catch(err){
        console.error(err.message); // บันทึกข้อความ error
        res.status(500).send('เกิดข้อผิดพลาดบนเซิร์ฟเวอร์'); // แจ้ง client ว่าเกิดปัญหาบนเซิร์ฟเวอร์
    }
}


exports.currentUser = async (req, res) => {
    try {

        User.findOne({ name: req.user.name }).select('-password')
            .then(user => {
                if (!user) {
                    // จัดการกับกรณี user ไม่พบ
                    return res.status(404).json({ message: "User not found" });
                }
               
                res.json(user);
               
            })
            .catch(err => {
                // จัดการกับ error อื่นๆ
                res.status(500).json({ message: "Error finding user" });
            });
        


    } catch (err) {
        console.log(err);
    }
}


