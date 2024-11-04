const ItemsSchema = require('../models/Items');
exports.getItems = async function() {
   
    const allItems = await ItemsSchema.find({})
    return(allItems)
        
  };
  // ค้นหาข้อมูล นำไปสร้างpath Online