const db = require("../config/db");

//table-name: products

const Order = function (order) {
    // this.order_id = cart.cart_id;
	this.customer_id = order.order_id;
	this.product_id = order.product_id;
    this.quantity = order.quantity;
    this.status = order.status;
    this.placedAt = order.placedAt;
};

Order.create = (newOrder, result) => {
	let query = "INSERT INTO orders SET ?;";
	console.log(newOrder);
	db.query(query, newOrder, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			console.log("here", { id: res.insertId, ...newOrder });
			result(null, { id: res.insertId, ...newOrder });
		}
	});
};
Order.findAll = (result) => {
	let query = "SELECT * from orders;";
	db.query(query, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

Order.findByCustomerId = (customer_id, result) => {
	let query = `SELECT * from orders WHERE customer_id = ${customer_id};`;
	db.query(query, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

Order.updateById = (order_id, order,result) => {
	let query = "UPDATE orders SET status = ? WHERE id=?";
	db.query(
		query,
		[order.status, order_id],
		(err, res) => {
			if (err) {
				result(err, null);
			} else {
				if (res.affectedRows == 0) result({ kind: "not_found" }, null);
				else result(null, { id: id, ...order });
			}
		}
	);
};


module.exports = Order;
