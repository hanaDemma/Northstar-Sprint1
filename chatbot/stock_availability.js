/**
 * stock_availability.js
 * ----------------------
 * Handles the "Stock Availability" ticket category for the Northstar support chatbot.
 *
 * Covers:
 *   - "Is the Smartphone in stock?"
 *   - "Do you have Running Shoes available?"
 *   - "How many Wireless Headphones do you have left?"
 */

const products = require("../data/products");

const STATUS_MESSAGES = {
  "In Stock": "Good news — it's in stock and ready to ship.",
  "Out of Stock": "That item is currently out of stock."
};

function findProductByName(name) {
  if (!name) return null;
  const normalized = name.trim().toLowerCase();
  return (
    products.find(p => p.productName.toLowerCase() === normalized) ||
    products.find(p => p.productName.toLowerCase().includes(normalized)) ||
    null
  );
}

/**
 * Pulls a known product name out of a free-form sentence, e.g.
 * "Is the Smartphone in stock?" -> the Smartphone product record.
 * Checks longer names first so "Running Shoes" wins over any shorter overlap.
 */
function extractProduct(text) {
  if (!text) return null;
  const lowered = text.toLowerCase();
  const sorted = [...products].sort((a, b) => b.productName.length - a.productName.length);
  return sorted.find(p => lowered.includes(p.productName.toLowerCase())) || null;
}

function formatStockStatus(item) {
  const baseMsg = STATUS_MESSAGES[item.stockStatus] || `Current status: ${item.stockStatus}.`;
  const lines = [
    `${item.productName} - ${item.stockStatus}`,
    baseMsg
  ];

  if (item.stockStatus === "In Stock") {
    lines.push(`Available units: ${item.stockQuantity}`);
  }

  if (item.size) {
    lines.push(`Size: ${item.size}`);
  }

  return lines.join("\n");
}

/**
 * Main entry point called by chatbot.js's router.
 * `session` is a per-conversation state object so we can ask a follow-up
 * question ("which product?") and resolve it on the next turn.
 * Returns { reply, session }.
 */
function handleStockAvailabilityQuery(text, session = {}) {
  // If we previously asked "which product?", treat this whole message as the name.
  if (session.awaiting === "product_name") {
    const item = findProductByName(text);
    delete session.awaiting;
    if (item) {
      return { reply: formatStockStatus(item), session };
    }
    return {
      reply: `I couldn't find a product called "${text.trim()}". Could you double check the name?`,
      session
    };
  }

  const item = extractProduct(text);
  if (item) {
    delete session.awaiting;
    return { reply: formatStockStatus(item), session };
  }

  session.awaiting = "product_name";
  return {
    reply: "Sure — which product would you like me to check stock for?",
    session
  };
}

module.exports = {
  findProductByName,
  extractProduct,
  formatStockStatus,
  handleStockAvailabilityQuery
};