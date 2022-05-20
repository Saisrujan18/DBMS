const Product = require("../models/products.model");

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

exports.create = (req, res) => {
	const { product } = req.body;
	const productObj = new Product({
		name: product.name,
		price: product.price,
		description: product.description,
		seller_id: product.seller_id,
		imagesrc: product.imagesrc,
		category: product.category,
		stock: product.stock
	});

	Product.create(productObj, (err, data) => {
		if (err) {
			err_(res, err.message, "creating");
		} else res.send(data);
	});
};

exports.findAll = (req, res) => {
	Product.findAll((err, data) => {
		if (err) err_(res, err.message, "findAll");
		else res.send(data);
	});
};


exports.findById = (req, res) => {
	const product_id = req.params.id;
	Product.findById(product_id, (err, data) => {
		if (err) {
			if (err.kind === "Not Found")
				err_(res, `No product with id: ${product_id}`, "findById", true);
			else err_(res, err.message);
		} else res.send(data);
	});
};

exports.findBySellerId = (req, res) => {
	const seller_id = req.params.id;
	Product.findBySellerId(seller_id, (err, data) => {
		if (err) {
			if (err.kind === "Not Found")
				err_(res, `No product with id: ${seller_id}`, "findById", true);
			else err_(res, err.message);
		} else res.send(data);
	})
}

exports.updateById = (req, res) => {
	if (!req.body) {
		res.state(400).send({
			message: "Empty Content for update",
		});
	}
	const product_id = req.body.product_id;
	const product = new Product(req.body);
	Product.updateById(product_id, product, (err, data) => {
		if (err) {
			if (err.kind === "Not Found")
				err_(res, `No product with id: ${product_id}`, "UpdateById", true);
			else err_(res, err.message, "updateById");
		} else res.send(data);
	});
};
