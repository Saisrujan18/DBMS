import auth from "../middleware/auth";
let express = require("express");
let router = express.Router();

let customers = require("../controllers/customers.controller");

router.put("/add", auth, customers.create);

router.get("/:id", auth,customers.findById);

router.get("/", auth,customers.findAll);

router.get("/update", auth,customers.updateById);

module.exports = router;

