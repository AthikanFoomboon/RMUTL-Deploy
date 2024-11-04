const mongoose = require('mongoose');

const ItemsSchema = new mongoose.Schema({
    nameItems: String,
    idItems:{
        type: String,
        required: true, //ข้อมูลห้ามซ้ำ
        unique: true    //ต้องมีข้อมูล
    },
    picture: String,
    person: String,
    urlDefault:String,
    newURL:String,
    UpdateURL:String,
    type: String,
    person:String,
    count:Number,
    Group:String,
    description:String,
   endTime:String,
   queue:Number,
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Corrected export statement
module.exports = mongoose.model('Items', ItemsSchema);
