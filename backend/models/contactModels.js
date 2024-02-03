//10

const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({     //10.1
  name: {
    type: String,
    required: [true, "please add the contact name"],
  },
  email: {
    type: String,
    required: [true, "please add the contact email"],
  },
  phone: {
    type: Number,
    required: [true, "please add the contact phone"],
  },
},{
    timestamps: true //10.2
});

module.exports = mongoose.model("contact", contactSchema); //10.3 different please see correctly
