import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Model = new Schema({
  name: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    
  },
  price: {
    type: Number,
    required: true,
  },
  ownerId: {
    type: String,
    required:true
  }
}, {
  timestamps:true
});

export default mongoose.model("product", Model);
