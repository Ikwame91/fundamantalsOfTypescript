export interface Entity{
    id: string;
}


export interface BankAccount extends Entity{
    accountNumber: string;
    pinHash: string;
    balance: number;
}

export interface CardData{
    pan: string;
    expiry: string;
}

export interface TransactionMessage {
    type: 'WITHDRAWAL' | 'BALANCE_INQUIRY';
    pan: string;
    pin: string;
    amount?: number;
}

export interface AuthorizationResponse{
    success: boolean;
    message: string;
    newBalance?: number;
}