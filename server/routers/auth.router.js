let express = require("express");
let router = express.Router();
let nodemailer = require("nodemailer");
let customers = require("../controllers/customers.controller");
const sellers = require("../controllers/sellers.controller");
router.post("/login", customers.findByEmailAndPassword);

router.post("/b/login", sellers.findByEmailAndPassword);

router.post("/register", customers.create);

var email_id;
var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);

let transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	service: "Gmail",

	auth: {
		user: "nath.vasam@gmail.com",
		pass: "VASAm@123",
	},
});

router.post("/sendotp", (req, res) => {
	email_id = req.body.email_id;
	// send mail with defined transport object
	otp = Math.random();
	otp = otp * 1000000;
	otp = parseInt(otp);
	var mailOptions = {
		to: email_id,
		subject: "Otp For Verification : ",
		html:
			"<h3>OTP for account verification is </h3>" +
			"<h1 style='font-weight:bold;'>" +
			otp +
			"</h1>", // html body
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log("Message sent: %s", info.messageId);
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

		res.send("otp");
	});
});

router.post("/verifyotp", (req, res) => {
	if (req.body.otp == otp) {
		res.send("Verified");
	} else res.send("Incorrect Otp");
});

module.exports = router;
