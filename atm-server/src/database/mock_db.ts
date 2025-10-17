import { BankAccount } from "../shared/interfaces";

const accounts: BankAccount[] = [
  {
    id: "acc-001",
    accountNumber: "1234567890",
    pinHash: "$2b$10$E.Exi/f99BvV3A.LVhL9guixlZCo4y5A2crb3k/kO2yvBCyY2Wd1O",
    balance: 1000,
  },
  {
    id: "acc-002",
    accountNumber: "0987654321",
    pinHash: "$2b$10$uQW.gPj3j2K/p9sJ3CjG/u4jZJ.Y.K.Y.K.Y.K.Y.K.Y.K.Y.K.Y",
    balance: 5000,
  },
  {
    id: "acc-003",
    accountNumber: "1122334455",
    pinHash: "$2b$10$A.B.C.D.E.F.G.H.I.J.K.L.M.N.O.P.Q.R.S.T.U.V.W.X",
    balance: 3000,
  },
];

// A mock hash for PIN '4567'
if (accounts[1]) {
  accounts[1].pinHash = '$2b$10$fW.Vl5vN6C2vV3A.LVhL9guixlZCo4y5A2crb3k/kO2yvBCyY2Wd1O';
}
// A mock hash for PIN '7890'
if (accounts[2]) {
  accounts[2].pinHash = '$2b$10$gH.Wl5vN6C2vV3A.LVhL9guixlZCo4y5A2crb3k/kO2yvBCyY2Wd1O';
}

 
export function findAccountByPan(pan: string): BankAccount | undefined {
  return accounts.find((account) => account.accountNumber === pan);
}

export function updateAccountBalance(pan: string, newBalance: number): void {
  const account = findAccountByPan(pan);
  if (account) {
    account.balance = newBalance;
    console.log(
      `[Database] Updated balance for account ${pan} to ${newBalance}`
    );
  }
}
