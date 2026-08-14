const orders = require("./orders");
const returns = require("./returns");

function findOrder(orderId) {
  return orders.find(order => order.orderId === orderId);
}

function findReturn(orderId) {
  return returns.find(item => item.orderId === orderId);
}

module.exports = {
  orders,
  returns,
  findOrder,
  findReturn
};