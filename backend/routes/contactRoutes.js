const express = require("express");
const router = express.Router(); //4 set a router
const { //5.3
  getContact,
  createContact,
  getContacts,
  deleteContact,
  updateContact,
} = require("../controllers/contactController"); //5.1



router.route("/").get(getContacts).post(createContact);// 4.1 <= 3.2 and 4.1 => 5.1  //5.4
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);// 4.1 <= 3.2 and 4.1 => 5.1  //5.4


// router.route("/").post(createContact);// 4.1 <= 3.2 and 4.1 => 5.1  //5.4

// router.route("/:id").put(updateContact);// 4.1 <= 3.2 and 4.1 => 5.1  //5.4

// router.route("/:id").delete(deleteContact);// 4.1 <= 3.2 and 4.1 => 5.1  //5.4

module.exports = router; //4.2


//5 in controllers folder