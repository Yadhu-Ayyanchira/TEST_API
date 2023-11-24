import mongoose, { Schema } from "mongoose";

const itemSchema = new mongoose.Schema({
  item: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});
