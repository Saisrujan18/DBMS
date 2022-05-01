let express = require("express");
let router = express.Router();

let cartitems = require("../controllers/cartitems.controller");

router.put("/add", cartitems.create);

// customer_id
router.get("/:id", cartitems.findById);

router.get("/", cartitems.findAll);

// cartitem_id
router.get("/update", cartitems.updateById);

router.get("/remove", cartitems.deleteById);

module.exports = router;

