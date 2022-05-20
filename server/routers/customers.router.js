//import auth from "../middleware/auth";
const auth = require("../middleware/auth");
let express = require("express");
let router = express.Router();

let customers = require("../controllers/customers.controller");

router.put("/add", auth, customers.create);

router.get("/:id", auth,customers.findById);

router.get("/", auth,customers.findAll);

router.post("/update", auth,customers.updateById);

module.exports = router;

