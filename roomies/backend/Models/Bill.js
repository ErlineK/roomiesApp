const mongoose = require("mongoose");
const user = require("./User").model("user");
const comment = require("./Comment").model("comment");
const house = require("./House").model("house");
const payment = require("./Payment").model("payment");

const BillSchema = new mongoose.Schema({
  date_added: {
    type: Date,
    default: Date.now
  },
  due_date: {
    type: Date
  },
  start_date: {
    type: Date
  },
  end_date: {
    type: Date
  },
  invoice_num: {
    type: String,
    maxlength: 12,
    default: 0000
  },
  ref_house: {
    type: mongoose.Types.ObjectId,
    ref: house,
    required: true
  },
  bill_type: {
    type: String,
    enum: [
      "Other",
      "Hydro",
      "Gas",
      "Internet/TV",
      "Groceries",
      "Roomie Transfer"
    ],
    required: true
  },
  total_amount: {
    type: Number,
    required: true,
    min: 0.1,
    max: 1000.0
  },
  payments: [
    {
      type: mongoose.Types.ObjectId,
      ref: payment
    }
  ],
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: comment
    }
  ],
  bill_images: [
    {
      type: String
    }
  ]
});

module.exports = Bill = mongoose.model("bill", BillSchema);