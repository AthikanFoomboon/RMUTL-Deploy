ขั้นตอนติดตั้งระบบ / deploy
# Server
  1.  สร้าง subdomain สำหรับ Server
  2.  อัปโหลดโปรเจคทั้งหมดไปยังเซิร์ฟเวอร์
  3.  ติดตั้งแพ็คเกจ Node.js โดยใช้คำสั่ง "npm install" ผ่านการรันคำสั่ง Node.js
  4.  ตั้งค่า Application Startup File ให้เซิร์ฟเวอร์ทำงาน โดยเลือกไฟล์จากโฟลเดอร์ Server และกำหนดไปที่ไฟล์ server.js
  5.  เปิดไฟล์ .env ในโฟลเดอร์ Server และแก้ไขค่า domain โดยกำหนด URLto ใหม่ (ใช้ domain ที่สร้างในข้อที่ 1)

# Client
  1.  สร้าง subdomain สำหรับ Client
  2.  เปิดไฟล์ .env ในโฟลเดอร์ Cilent และแก้ไขค่า domain โดยกำหนดค่าของ REACT_APP_API, REACT_APP_IMG  ใหม่ (ใช้ domain ที่สร้างใหม่จาก Server)
      - ตัวอย่าง REACT_APP_API ='https://rmutl.com/api'
      - ตัวอย่าง REACT_APP_IMG ='https://rmutl.com/img'
  3.  build โปรเจค Client เพื่อสร้างไฟล์ static ก่อนขึ้น server โดยใช้คำสั่ง  "npm run build"  
  4.  อัปโหลดโปรเจคไปยังเซิร์ฟเวอร์ (folder build)

