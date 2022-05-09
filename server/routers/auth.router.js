let express = require("express");
let router = express.Router();
let customers = require("../controllers/customers.controller");

router.post("/login", customers.findByEmail);

router.post("/register", customers.create);

module.exports = router;