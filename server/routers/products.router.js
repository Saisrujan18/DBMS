// import auth from "../middleware/auth";

const auth = require("../middleware/auth");
let express = require("express");
let router = express.Router();

let products = require("../controllers/products.controller");

router.post("/add", auth, products.create);


router.get("/:id", auth, products.findById);

router.get("/b/:id", auth, products.findBySellerId);

router.get("/", auth, products.findAll);

module.exports = router;
