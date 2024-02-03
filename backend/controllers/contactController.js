// 8 here async because we are using a mongoose always get promise and install async-handler
const asyncHandler = require("express-async-handler"); // for try catch
const Contact = require("../models/contactModels"); // 5.4 <= 10.3
//9 mongodb setup
//10 create model file and contactModel.js

//5
//@description get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req, res) => {
  // 5.1
  const contacts = await Contact.find({ user_id: req.user.id }); // 5.5
  res.status(200).json(contacts); // 5.6
  //   res.status(200).json({ message: "get all contacts" }); // 5.1
});

//@description create new contacts
//@route POST /api/contacts
//@access private

const createContact = asyncHandler(async (req, res) => {
  console.log("the request body is", req.body); // 5.2 for receive the request body we need to create a middleware
  const { name, email, phone } = req.body; // 5.3 error handling //6 start
  if (!name || !email || !phone) {
    res.status(404);
    throw new Error("Please fill all the fields"); //here we cant get a json format error so we need to create custom middleware for error handling
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id, // 5.6
  }); // 5.7
  //   res.status(200).json({ message: "create contacts" }); // 5.1 <= 4.1
  res.status(200).json(contact); // 5.8
});

//@description get all contact
//@route GET /api/contacts/:id
//@access private

const getContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id); // 5.9
  if (!contact) {
    res.status(404);
    return next(new Error("Contact not found"));
  }
  res.status(200).json(contact); // 5.9
  //   res.status(200).json({ message: `get contacts for ${req.params.id}` }); // 5.1 <= 4.1
});

//@description Update specific contacts
//@route PUT /api/contacts/:id
//@access private

const updateContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id); // 5.10
  if (!contact) {
    res.status(404);
    return next(new Error("Contact not found"));
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(401);
    return next(new Error("user don't have access to update this contact"));
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact); // 5.10
  // res.status(200).json({ message: `update contacts for ${req.params.id}` }); // 5.1 <= 4.1
});

//@description delete specific contacts
//@route DELETE /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id); // 5.10
  if (!contact) {
    res.status(404);
    return next(new Error("Contact not found"));
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(401);
    return next(new Error("user don't have access to update this contact"));
  }
  await contact.deleteOne({_id:req.params.id});
  res.status(200).json(contact); // 5.11

  //from here started authentications

  // res.status(200).json({ message: `delete contacts for ${req.params.id}` }); // 5.1 <= 4.1
});

module.exports = {
  getContact,
  createContact,
  getContacts,
  deleteContact,
  updateContact,
}; //5.2
