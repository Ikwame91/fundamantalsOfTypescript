import { BankHostService } from "./services/bank_host_service";
import { TransactionMessage } from "./shared/interfaces";
import { encryptPin } from "./utils/pin_encryptor";

function simulateAtmSession(
  bankHost: BankHostService,
  pan: string,
  pin: string,
  transaction: { type: "WITHDRAWAL" | "BALANCE_INQUIRY"; amount?: number }
) {
  console.log(`\n-- [ATM] starting new session for PAN: ${pan} --`);

  // Encrypt the PIN before sending
  console.log("[ATM] Encrypting PIN...");
  const encryptedPin = encryptPin(pin);

  const message: TransactionMessage = {
    pan,
    encryptedPin,
    type: transaction.type,
    ...(transaction.amount !== undefined && { amount: transaction.amount }),
  };

  console.log("[ATM] Sending transaction message to Bank Host...");
  const response = bankHost.authorizeTransaction(message);

  console.log(`[ATM] received response: ${response.message}`);
  if (response.success) {
    if (response.newBalance !== undefined) {
      console.log(`[ATM] your new balance is: $${response.newBalance}`);
    }
  }
  console.log("--[ATM] session ended ----");
}

function main() {
  console.log(` ATM server sumulation initialized`);

  const bankHost = new BankHostService();

  // Simulate a balance inquiry
  simulateAtmSession(bankHost, "1234567890", "1234", {
    type: "BALANCE_INQUIRY",
  });
  simulateAtmSession(bankHost, "0987654321", "4567", {
    type: "WITHDRAWAL",
    amount: 1000,
  });

  simulateAtmSession(bankHost, "1122334455", "7890", {
    type: "WITHDRAWAL",
    amount: 4000,
  });
  simulateAtmSession(bankHost, "0000000000", "0000", {
    type: "BALANCE_INQUIRY",
  });
  simulateAtmSession(bankHost, "1234567890", "0000", {
    type: "WITHDRAWAL",
    amount: 100,
  });
  simulateAtmSession(bankHost, "0987654321", "4567", {
    type: "WITHDRAWAL",
    amount: -500,
  });
}

main();
