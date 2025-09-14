const express = require("express");
const {createUser, getUsers} = require("../controllers/userController");

const router = express.Router();

// POST /api/users
router.post("/", createUser);

// GET /api/users
router.get("/", getUsers);

module.exports = router;
