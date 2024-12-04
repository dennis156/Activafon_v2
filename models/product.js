import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  part_name: { type: String, required: true },
  brand: {
    name: { type: String, required: true },
    logo: { type: String },
  },
  model: {
    name: { type: String, required: true },
    year: { type: Number },
  },
  part_number: { type: String, required: true },
  compatibility: [{ type: String }],
  description: { type: String },
  price: { type: Number, required: true },
  warranty: { type: String },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  supplier: {
    name: { type: String },
    contact_info: {
      phone: { type: String },
      email: { type: String },
    },
  },
  images: [{ type: String }],
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
