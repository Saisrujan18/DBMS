require("dotenv").config();
const jwt = require("jsonwebtoken");
const Seller = require("../models/sellers.model");

const err_ = (res, message, op, e404 = false) => {
	if (e404) {
		res.status(404).send({
			message: message,
		});
		return;
	}
	res.status(500).send({
		message: `Some error occurred while performing: ${op}`,
	});
};

exports.findByEmailAndPassword = (req, res) => {
	const { email_id, password } = req.body;
	Seller.findByEmailAndPassword(email_id, password, (err, data) => {
		if (err || data.length === 0) err_(res, "No user found", "findByEmail");
		else {
			data = data[0];
			const token = jwt.sign(
				{
					seller_id: data.seller_id,
					email_id: data.email_id,
					name: data.name,
				},
				process.env.TOKEN_KEY,
				{
					expiresIn: "2h",
				}
			);
			data.token = token;
			delete data["password"];
			res.json(data);
		}
	});
};
