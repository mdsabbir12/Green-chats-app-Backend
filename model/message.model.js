import mongoose from "mongoose";

const messageSchema =mongoose.Schema({
    senderid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reciverid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    message: {
        type:String,
        required: true, 
        maxlength:1000,
        trim:true,
        validate:[
          {
             validator:(value)=>value.length >0,
             message:"Message can not be Empty"
          },
        ],

    },
    createdAt:{
        type: Date,
        default: Date.now
    },
},{
    timestamps: true,
});


const Message = mongoose.model("messages", messageSchema);
export default Message;