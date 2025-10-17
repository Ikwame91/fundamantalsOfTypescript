import { findAccountByPan, updateAccountBalance } from "../database/mock_db";
import {
  AuthorizationResponse,
  BankAccount,
  TransactionMessage,
} from "../shared/interfaces";
import * as bcrypt from "bcrypt";

export class BankHostService {
  public async authorizeTransaction(message: TransactionMessage): Promise<AuthorizationResponse> {
    const account = findAccountByPan(message.pan);
    if (!account) {
      return { success: false, message: "Account not found" };
    }

    //compare the provided pin with stored hash
    const isPinValid = await bcrypt.compare(message.pin, account.pinHash);
    if (!isPinValid) {
      return { success: false, message: "Invalid PIN" };
    }

    switch (message.type) {
      case "BALANCE_INQUIRY":
        return this.handleBalanceInquiry(account);
      case "WITHDRAWAL":
        return this.handleWithdrawal(account, message.amount);
      default:
        const exhaustiveCheck: never = message.type;
        return {
          success: false,
          message: `Unknown transaction type : ${exhaustiveCheck}};`,
        };
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

    const newBalance = account.balance -= amount;
    updateAccountBalance(account.accountNumber,newBalance)
    return {
      success: true,
      message: "Withdrawal approved",
      newBalance: account.balance,
    };
  }
}
