export interface Account {
  accountId: number;
  bankName: string;
  accountName: string;
  balance: number;
}

export type CreateAccountDto = Omit<Account, "accountId">;
export type UpdateAccountDto = Partial<Account>;
export type DeleteAccountDto = {
  accountId: number;
};
