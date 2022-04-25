const db = require("../config/db");

//table-name: products

const CartItem = function (cart_item) {
    // this.cart_id = cart.cart_id;
	this.customer_id = cart_item.customer_id;
	this.product_id = cart_item.product_id;
    this.quantity = cart_item.quantity;
};

CartItem.create = (newCartItem, result) => {
	let query = "INSERT INTO cartitems SET ?;";
	console.log(newCartItem);
	db.query(query, newCartItem, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			console.log("here", { id: res.insertId, ...newCartItem });
			result(null, { id: res.insertId, ...newCartItem });
		}
	});
};
CartItem.findAll = (result) => {
	let query = "SELECT * from cartitems;";
	db.query(query, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

CartItem.findByCustomerId = (customer_id, result) => {
	let query = `SELECT * from cartitems WHERE customer_id = ${customer_id};`;
	db.query(query, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

CartItem.updateById = (cartitem_id, cart_item, result) => {
	let query = "UPDATE cartitems SET customer_id = ?, quantity=? WHERE id=?";
	db.query(
		query,
		[cart_item.customer_id, cart_item.quantity, cartitem_id],
		(err, res) => {
			if (err) {
				result(err, null);
			} else {
				if (res.affectedRows == 0) result({ kind: "not_found" }, null);
				else result(null, { id: id, ...cart_item });
			}
		}
	);
};

CartItem.deleteById = (cartitem_id, cart_item, result) =>{
	let query = "DELETE from cartitems WHERE id=? and product_id=?";
	db.query(
		query,
		[cartitem_id, cart_item.product_id],
		(err, res) => {
			if (err) {
				result(err, null);
			} else {
				if (res.affectedRows == 0) result({ kind: "not_found" }, null);
				else result(null, { id: id, ...cart_item });
			}
		}
	)
}

module.exports = Cart;
