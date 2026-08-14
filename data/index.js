const orders = require("./orders");
const returns = require("./returns");
const products = require("./products");

function findOrder(orderId) {
  return orders.find(order => order.orderId === orderId);
}

function findReturn(orderId) {
  return returns.find(item => item.orderId === orderId);
}

function findProduct(productId) {
  return products.find(product => product.productId === productId);
}

module.exports = {
  orders,
  returns,
  products,
  findOrder,
  findReturn,
  findProduct
};