let express = require("express");
let router = express.Router();

let orders = require("../controllers/orders.controller");

router.put("/add", orders.create);

// customer_id
router.get("/:id", orders.findById);

router.get("/", orders.findAll);

router.get("/update", orders.updateById)

module.exports = router;

