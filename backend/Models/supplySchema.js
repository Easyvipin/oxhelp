import mongoose from "mongoose";

const supplySchema = new mongoose.Schema(
  {
    org: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    helplines: {
      type: Array,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false /* only be changed from admin*/,
    },
    verifyScore: {
      type: Number,
      default: 0,
    },
    Report: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Supplier = mongoose.model("Supplier", supplySchema);

export default Supplier;
