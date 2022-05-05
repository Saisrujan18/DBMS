let express = require("express");
let router = express.Router();
let customers = require("../controllers/customers.controller");

router.post("/login", customers.findbyEmail);

router.post("/register", customers.create);