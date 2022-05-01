let express = require("express");
let router = express.Router();

let customers = require("../controllers/customers.controller");

router.put("/add", customers.create);

router.get("/:id", customers.findById);

router.get("/", customers.findAll);

router.get("/update", customers.updateById);

module.exports = router;

