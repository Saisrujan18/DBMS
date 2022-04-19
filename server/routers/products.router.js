let express = require("express");
let router = express.Router();

let products = require("../controllers/products.controller");

router.put("/add", products.create);

router.get("/:id", products.findById);

router.get("/", products.findAll);

module.exports = router;
