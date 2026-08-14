/**
 * app.js
 * ------
 * Entry point for the Northstar Support Deflection MVP (CLI demo).
 *
 * Run:
 *   node app.js
 *
 * Type 'quit' to exit.
 */

const readline = require("readline");
const { handleMessage } = require("./chatbot");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("=".repeat(60));
console.log("Northstar Support Assistant (MVP demo - order status)");
console.log("Type 'quit' to exit.");
console.log("=".repeat(60));

let session = { awaiting: null };

function prompt() {
  rl.question("\nYou: ", input => {
    const text = input.trim();

    if (["quit", "exit"].includes(text.toLowerCase())) {
      console.log("Bot: Glad I could help. Goodbye!");
      rl.close();
      return;
    }

    if (!text) {
      prompt();
      return;
    }

    const result = handleMessage(text, session);
    session = result.session;
    console.log(`Bot: ${result.reply}`);
    prompt();
  });
}

prompt();