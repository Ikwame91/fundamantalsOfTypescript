import { findAccountByPan } from "../database/mock_db";
import {
  AuthorizationResponse,
  BankAccount,
  TransactionMessage,
} from "../shared/interfaces";
import { decryptPin } from "../utils/pin_encryptor";

export class BankHostService {
  public authorizeTransaction(
    message: TransactionMessage
  ): AuthorizationResponse {
    const account = findAccountByPan(message.pan);
    if (!account) {
      return { success: false, message: "Account not found" };
    }

    const decryptedPin = decryptPin(message.encryptedPin);
    if (decryptedPin !== account.pinHash) {
      return { success: false, message: "Invalid PIN" };
    }

    switch (message.type) {
      case "BALANCE_INQUIRY":
        return this.handleBalanceInquiry(account);
      case "WITHDRAWAL":
        return this.handleWithdrawal(account, message.amount);
      default:
        return { success: false, message: "Unknown transaction type" };
    }
  }

  private handleBalanceInquiry(account: BankAccount): AuthorizationResponse {
    return {
      success: true,
      message: "Balance inquiry approved",
      newBalance: account.balance,
    };
  }

  private handleWithdrawal(
    account: BankAccount,
    amount?: number
  ): AuthorizationResponse {
    if (amount === undefined || amount <= 0) {
      return { success: false, message: "Invalid withdrawal amount" };
    }
    if (account.balance < amount) {
      return { success: false, message: "Insufficient funds" };
    }

    account.balance -= amount;
    return {
      success: true,
      message: "Withdrawal approved",
      newBalance: account.balance,
    };
  }
}
