const db = require("../config/db");

//table-name: products

const Product = function (product) {
	this.name = product.name;
	this.price = product.price;
	this.seller_id = product.seller_id;
	this.category = product.category;
	this.imagesrc = product.imagesrc;
	this.description = product.description;
	this.stock = product.stock;
};

Product.create = (newProduct, result) => {
	let query = "INSERT INTO products SET ?;";
	console.log(newProduct);
	db.query(query, newProduct, (err, res) => {
		if (err) {
			console.log(err);
			result(err, null);
		} else {
			console.log("here", { product_id: res.insertId, ...newProduct });
			result(null, { product_id: res.insertId, ...newProduct });
		}
	});
};
Product.findAll = (result) => {
	let query = "SELECT * from products;";
	db.query(query, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

Product.findById = (product_id, result) => {
	let query = `SELECT * from products WHERE oroduct_id = ${product_id};`;
	db.query(query, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

Product.findBySellerId = (seller_id, result) => {
	let query = `SELECT * from products WHERE seller_id = ${seller_id};`;
	db.query(query, (err, res) => {
		if (err) {
			result(err, null);
		} else {
			result(null, res);
		}
	});
};


Product.updateById = (product_id, product, result) => {
	let query = "UPDATE products SET id = ?, name = ?, price = ?, seller_id = ?;";
	db.query(
		query,
		[product_id, product.name, product.price, product.seller_id],
		(err, res) => {
			if (err) {
				result(err, null);
			} else {
				if (res.affectedRows == 0) result({ kind: "not_found" }, null);
				else result(null, { id: id, ...product });
			}
		}
	);
};

module.exports = Product;
