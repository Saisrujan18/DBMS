let express = require("express");
const accountRouter = require("../controllers/accounts.controller");
let router = express.Router();

router.post("/", accountRouter.findByAccount);

module.exports = router;
