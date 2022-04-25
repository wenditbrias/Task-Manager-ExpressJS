const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
    title:{
        type:String,
        required:true 
    }, 
    createdAt:{
        type:Date,
        required:true, 
        default:new Date()
    },
    complete:{
        type:Boolean,
        required:true 
    }
});

const taskModel = mongoose.model('tasks' , taskSchema);

module.exports = taskModel;