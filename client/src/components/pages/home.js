import React from 'react';
import Logo from "../../assets/your_logo_url.png";

export default function Home() {
  return (
    <div style={{ textAlign: "center" ,margin:'1%' }}>
      <img
        src={Logo}
        alt="Organization Logo"
        
        style={{ display: "block", margin: "0 auto", padding: "10px", maxWidth:'40%',minWidth:'300px'}}
      />
      <h4>
        ยินดีต้อนรับเข้าสู่ระบบจัดการสินค้า เพื่อช่วยให้จัดเก็บ แชร์ <br />และติดตาม URL สินค้าได้อย่างสะดวก <br /> <br />
        ร้านสหกรณ์มหาวิทยาลัยเชียงใหม่ 
      </h4>
    </div>
  );
}
