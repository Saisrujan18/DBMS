let express = require("express");
let router = express.Router();
// import auth from "../middleware/auth";
const auth = require("../middleware/auth");
let cartitems = require("../controllers/cartitems.controller");

router.put("/add", auth ,cartitems.create);

// customer_id
router.get("/:id", auth, cartitems.findById);

router.get("/", auth, cartitems.findAll);

// cartitem_id
router.get("/update", auth, cartitems.updateById);

router.get("/remove", auth, cartitems.deleteById);

module.exports = router;

