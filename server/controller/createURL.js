

exports.createURL = async function (fromData) {
    try {
        // ใช้ encodeURIComponent เพื่อรักษาความปลอดภัยของข้อมูลที่ส่งผ่าน URL
        let encodedName = encodeURIComponent(fromData.nameItems);
        
        // ตรวจสอบความยาวของ encodedName
        if (encodedName.length > 192) {
            encodedName = encodedName.substring(0, 192); // เลือกเฉพาะ 292 bytes แรก
        }

        let newURL = `/NAME-${encodedName}/ID-${encodeURIComponent(fromData.idItems)}`;
        return newURL;
    } catch (error) {
        console.error('Error in createURL:', error.message);
        throw error;
    }
};

