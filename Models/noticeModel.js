import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String, required: true
  },
  type: {
    type: String, required: true
  },
  isActive: {
    type: Boolean, required: true
  },
  createdAt: {
    type: Date, default: Date.now
  }
});

const Notice = mongoose.model("Notice", noticeSchema);

export default Notice;
