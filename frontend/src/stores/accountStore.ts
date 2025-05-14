import { defineStore } from "pinia";
import type {
  Account,
  CreateAccountDto,
  UpdateAccountDto,
} from "@/types/Account";
import {
  getAccountsByUserId,
  createAccount as createAccountService,
  updateAccount as updateAccountService,
  deleteAccount as deleteAccountService,
} from "@/services/accountService";

export const useAccountStore = defineStore("account", () => {
  const accounts = ref<Account[]>([]);

  const getAccounts = async (userId: number) => {
    const response = await getAccountsByUserId(userId);
    accounts.value = response;
  };

  const createAccount = async (userId: number, account: CreateAccountDto) => {
    const response = await createAccountService(userId, account);
    accounts.value.push(response);
  };

  const updateAccount = async (
    accountId: number,
    account: UpdateAccountDto
  ) => {
    const response = await updateAccountService(accountId, account);
    const index = accounts.value.findIndex((a) => a.accountId === accountId);
    if (index !== -1) {
      accounts.value[index] = response;
    }
  };

  const deleteAccount = async (accountId: number) => {
    await deleteAccountService(accountId);
    accounts.value = accounts.value.filter((a) => a.accountId !== accountId);
  };

  return { accounts, getAccounts, createAccount, updateAccount, deleteAccount };
});
