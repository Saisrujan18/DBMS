const Account = require("../models/accounts.model");

const err_ = (res, message, op, e404 = false) => {
	if (e404) {
		res.status(404).send({
			message: message,
		});
		return;
	}
	res.status(500).send({
		message: message || `Some error occurred while performing: ${op}`,
	});
};

exports.findByAccount = (req, res) => {
	const account_number = req.body.account_number;
	console.log(account_number);
	Account.findByAccount(account_number, (err, data) => {
		if (err) {
			if (err.kind === "Not Found")
				err_(
					res,
					`No account with id: ${account_number}`,
					"findByAccountNumber1",
					true
				);
			else err_(res, err.message);
		} else res.send(data);
	});
};
