import express from "express";
import { TransactionMessage } from "./shared/interfaces";
import { BankHostService } from "./services/bank_host_service";

const bankHost = new BankHostService();
const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/authorize", (req, res) => {
  console.log("[Bank Host] Received transaction request...");
  try {
    const message = req.body as TransactionMessage;
    if (!message || !message.pan || !message.encryptedPin || !message.type) {
      return res.status(400).json({
        success: false, // Corrected from true
        message: "Bad Request: Invalid transaction message format.",
      });
    }

    const response = bankHost.authorizeTransaction(message);
    console.log(`[Bank Host] Sending response: ${response.message}`);
    // Send 200 for success, 401 for failure
    res.status(response.success ? 200 : 401).json(response);
  } catch (error) {
    console.error("[Bank Host] An unexpected error occurred:", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
});

//start the server
app.listen(PORT, () => {
  console.log(`🏦 Bank Host server listening on http://localhost:${PORT}`);
});
