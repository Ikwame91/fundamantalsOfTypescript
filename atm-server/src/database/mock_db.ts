import { BankAccount } from "../shared/interfaces";


const accounts: BankAccount[]=[
    {id: "acc-001", accountNumber: "1234567890", pinHash: "1234", balance: 1000},
    {id: "acc-002", accountNumber: "0987654321", pinHash: "4567", balance: 5000},
    {id: "acc-003", accountNumber: "1122334455", pinHash: "7890", balance: 3000},

]

export function findAccountByPan(pan: string): BankAccount | undefined{
    return accounts.find(account => account.accountNumber === pan);
}