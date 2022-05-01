const express = require("express");
const db = require("./config/db");
const cors = require("cors");

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

const productsRouter = require("./routers/products.router");
const ordersRouter = require("./routers/orders.router");
const customersRouter = require("./routers/customers.router");
const cartitemsRouter = require("./routers/cartitems.router");

app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/customers", customersRouter);
app.use("/api/cartitems", cartitemsRouter);

app.listen(PORT, () => {
	console.log(`Server Listening on Port ${PORT}`);
});
