const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const commentsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

mongoose.model("comments",commentsSchema)