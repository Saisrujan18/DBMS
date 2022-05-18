let express = require("express");
let router = express.Router();
// import auth from "../middleware/auth";
const auth = require("../middleware/auth");
let cartitems = require("../controllers/cartitems.controller");


// router.get("/:id", auth, cartitems.findById);

router.get("/", auth, cartitems.findById);

// customer_id
router.post("/add", auth ,cartitems.create);
// cartitem_id
router.get("/update", auth, cartitems.updateById);

router.post("/remove", auth, cartitems.deleteById);

module.exports = router;

