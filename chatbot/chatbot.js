/**
 * chatbot.js
 * ----------
 * Lightweight rule-based intent router for the Northstar Support Deflection MVP.
 *
 * Currently wired for:
 *   - order_status (implemented, see order_status.js)
 *
 * Add returns_refunds.js / stock_availability.js the same way later:
 * a keyword list + a handler function reference.
 */

const { handleOrderStatusQuery, extractOrderId } = require("./order_status");
const { handleStockAvailabilityQuery, extractProduct } = require("./stock_availability");

const GREETING_KEYWORDS = ["hi", "hello", "hey"];

const ORDER_STATUS_KEYWORDS = [
  "order status", "where is my order", "where's my order", "track my order",
  "tracking", "shipped", "ship", "arrive", "delivery", "delivered", "order"
];

const STOCK_AVAILABILITY_KEYWORDS = [
  "in stock", "out of stock", "stock availability", "available",
  "availability", "do you have", "back in stock", "restock", "restocking"
];

const HELP_MESSAGE =
  "I can help with order status or stock availability questions right now — for example:\n" +
  '  - "Where is my order ORD002?"\n' +
  '  - "Has my order shipped yet?"\n' +
  '  - "Is the Smartphone in stock?"\n' +
  "Just include your order number, name on the order, or the product you're asking about.";

function detectIntent(text) {
  const lowered = text.toLowerCase().trim();

  if (GREETING_KEYWORDS.some(g => lowered === g || lowered.startsWith(g))) {
    return "greeting";
  }

  // A bare order number is a strong signal on its own (e.g. a follow-up reply).
  if (extractOrderId(text)) {
    return "order_status";
  }

  if (ORDER_STATUS_KEYWORDS.some(kw => lowered.includes(kw))) {
    return "order_status";
  }

  if (STOCK_AVAILABILITY_KEYWORDS.some(kw => lowered.includes(kw))) {
    return "stock_availability";
  }

  // A recognized product name on its own is a strong signal too
  // (e.g. a follow-up reply naming the item).
  if (extractProduct(text)) {
    return "stock_availability";
  }

  return "unknown";
}

/**
 * Main chatbot entry point.
 * `session` carries lightweight per-conversation state between turns.
 * Returns { reply, session }.
 */
function handleMessage(text, session = { awaiting: null }) {
  // Keep routing to the same handler until it resolves a pending follow-up.
  if (session.awaiting === "order_identifier") {
    return handleOrderStatusQuery(text, session);
  }
  if (session.awaiting === "product_name") {
    return handleStockAvailabilityQuery(text, session);
  }

  const intent = detectIntent(text);

  if (intent === "greeting") {
    return { reply: `Hi! I'm the Northstar support assistant. ${HELP_MESSAGE}`, session };
  }

  if (intent === "order_status") {
    return handleOrderStatusQuery(text, session);
  }

  if (intent === "stock_availability") {
    return handleStockAvailabilityQuery(text, session);
  }

  return { reply: `Sorry, I didn't quite catch that. ${HELP_MESSAGE}`, session };
}

module.exports = { detectIntent, handleMessage };