import auth from "../middleware/auth";
let express = require("express");
let router = express.Router();

let products = require("../controllers/products.controller");

router.put("/add", auth, products.create);

router.get("/:id", auth, products.findById);

router.get("/", auth, products.findAll);

module.exports = router;

