import mongoose, { Schema } from "mongoose";

const itemSchema = new mongoose.Schema({
  user: {
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

const Item = mongoose.model("Item", itemSchema);
export default Item;