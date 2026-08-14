/**
 * order_status.js
 * ----------------
 * Handles the "Order Status" ticket category for the Northstar support chatbot.
 *
 * Covers:
 *   - "Where is my order?"
 *   - "Has this shipped yet?"
 *   - "What's the status of ORD002?"
 *
 * Note: requires ./orders directly (not through index.js) so this module has
 * no dependency on returns.js, which is owned by the returns/refunds workflow.
 */

const orders = require("../data/orders");

const ORDER_ID_PATTERN = /\bORD\d{3,6}\b/i;

const STATUS_MESSAGES = {
  Processing: "Your order has been received and is being prepared. It hasn't shipped yet.",
  Shipped: "Your order is on its way!",
  "Out for Delivery": "Your order is out for delivery and should arrive today.",
  Delivered: "Your order has already been delivered.",
  Cancelled: "This order was cancelled and will not be shipped."
};

function findOrderById(orderId) {
  if (!orderId) return null;
  const normalized = orderId.trim().toUpperCase();
  return orders.find(order => order.orderId.toUpperCase() === normalized) || null;
}

function findOrdersByCustomerName(name) {
  if (!name) return [];
  const normalized = name.trim().toLowerCase();
  return orders.filter(order => order.customerName.toLowerCase().includes(normalized));
}

function extractOrderId(text) {
  const match = text.match(ORDER_ID_PATTERN);
  return match ? match[0].toUpperCase() : null;
}

function formatOrderStatus(order) {
  const baseMsg = STATUS_MESSAGES[order.orderStatus] || `Current status: ${order.orderStatus}.`;
  const lines = [
    `Order ${order.orderId} - ${order.orderStatus}`,
    `Item: ${order.quantity}x ${order.product}`,
    baseMsg
  ];

  if (["Shipped", "Out for Delivery"].includes(order.orderStatus) && order.trackingNumber) {
    lines.push(`Tracking #: ${order.trackingNumber}`);
  }

  if (order.estimatedDelivery) {
    const label = order.orderStatus === "Delivered" ? "Delivered on" : "Estimated delivery";
    lines.push(`${label}: ${order.estimatedDelivery}`);
  }

  return lines.join("\n");
}

function formatOrderList(matches) {
  if (matches.length === 0) {
    return "I couldn't find any orders under that name. Could you share your order number instead (e.g. ORD002)?";
  }
  if (matches.length === 1) {
    return formatOrderStatus(matches[0]);
  }
  const lines = ["I found a few orders under that name:"];
  matches.forEach(o => {
    lines.push(`  - ${o.orderId}: ${o.product} (${o.orderStatus})`);
  });
  lines.push("\nReply with the order number you'd like details on (e.g. ORD002).");
  return lines.join("\n");
}

/**
 * Main entry point called by chatbot.js's router.
 * `session` is a per-conversation state object so we can ask a follow-up
 * question and resolve it on the next turn.
 * Returns { reply, session }.
 */
function handleOrderStatusQuery(text, session = {}) {
  const orderId = extractOrderId(text);
  if (orderId) {
    const order = findOrderById(orderId);
    delete session.awaiting;
    if (order) {
      return { reply: formatOrderStatus(order), session };
    }
    return {
      reply: `I couldn't find an order with ID ${orderId}. Please double check the order number (format: ORD001).`,
      session
    };
  }

  // If we previously asked "which order / what name", treat this whole
  // message as the customer name.
  if (session.awaiting === "order_identifier") {
    const matches = findOrdersByCustomerName(text);
    delete session.awaiting;
    return { reply: formatOrderList(matches), session };
  }

  session.awaiting = "order_identifier";
  return {
    reply: "I can check that for you — could you share your order number (e.g. ORD002) or the full name on the order?",
    session
  };
}

module.exports = {
  findOrderById,
  findOrdersByCustomerName,
  extractOrderId,
  formatOrderStatus,
  formatOrderList,
  handleOrderStatusQuery
};