const express = require("express");
const router = express.Router({ mergeParams: true }); //mergePar gives access to ID inside of router

const { createMessage } = require("../handlers/messages");

// prefix - /api/users/:id/messages
router.route("/").post(createMessage);

module.exports = router;