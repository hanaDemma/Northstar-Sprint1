const returns = [
  {
    returnId: "RET001",
    orderId: "ORD006",
    customerName: "Nazerene Otieno",
    product: "Running Shoes",
    returnReason: "Wrong Size",
    returnStatus: "Requested",
    refundStatus: "Not Started",
    refundAmount: 3500,
    expectedRefundDate: null
  },

  {
    returnId: "RET002",
    orderId: "ORD007",    
    customerName: "Gilbert Chesoi",
    product: "Smartwatch",
    returnReason: "Damaged",
    returnStatus: "Approved",
    refundStatus: "Processing",
    refundAmount: 1500,
    expectedRefundDate: "2026-08-18"
  },

  {
    returnId: "RET003",
    orderId: "ORD008",
    customerName: "Edwin Kamau",
    product: "Laptop bag",
    returnReason: "Not as Expected",
    returnStatus: "Completed",
    refundStatus: "Completed",
    refundAmount: 1000,
    expectedRefundDate: "2026-08-13"
  },

  {
    returnId: "RET004",
    orderId: "ORD009",
    customerName: "Christine Angella",
    product: "Smartphone",
    returnReason: "Defective",
    returnStatus: "Approved",
    refundStatus: "Processing",
    refundAmount: 30000,
    expectedRefundDate: "2026-08-19"
  }
];

module.exports = returns;