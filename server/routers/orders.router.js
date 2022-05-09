//import auth from "../middleware/auth";
const auth = require("../middleware/auth");
let express = require("express");
let router = express.Router();

let orders = require("../controllers/orders.controller");

router.put("/add", auth, orders.create);

// customer_id
router.get("/:id", auth, orders.findById);

router.get("/", auth, orders.findAll);

router.get("/update", auth, orders.updateById);

module.exports = router;
