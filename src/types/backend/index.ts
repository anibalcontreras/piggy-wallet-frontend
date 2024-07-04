export interface User {
  userId: string;
  firstName: string;
  email?: string;
}

export interface Balance {
  balance: number;
}

export interface DebtsTransactions {
  presentWeek: DebtTransaction[];
  lastWeek: DebtTransaction[];
  previousWeeks: DebtTransaction[];
}

export interface DebtTransaction {
  id: number;
  user: User;
  debtor: User;
  amount: number;
  description?: string;
  isPaid: boolean;
  createdAt: string;
}
