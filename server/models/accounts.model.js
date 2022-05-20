const db = require("../config/db");

//table-name: products

const Account = function (account) {
	// this.cart_id = cart.cart_id;
	this.account_number = account.account_number;
	this.email_id = account.email_id;
	this.balance = account.balance;
};

Account.findByAccount = (account_number, result) => {
	let query = `SELECT * from accounts WHERE account_number = ${account_number}`;
	db.query(query, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};
module.exports = Account;
