import api from "@/plugins/axios";
import type {
  Account,
  CreateAccountDto,
  UpdateAccountDto,
} from "@/types/Account";
const apiUrl = import.meta.env.VITE_API_URL;

export const getAccountsByUserId = async (userId: number) => {
  const response = await api.get(`${apiUrl}/accounts/user/${userId}`);
  return response.data;
};

export const createAccount = async (
  userId: number,
  account: CreateAccountDto
) => {
  const response = await api.post(`${apiUrl}/accounts/user/${userId}`, account);
  return response.data;
};

export const updateAccount = async (
  accountId: number,
  account: UpdateAccountDto
) => {
  const response = await api.patch(`${apiUrl}/accounts/${accountId}`, account);
  return response.data;
};

export const deleteAccount = async (accountId: number) => {
  const response = await api.delete(`${apiUrl}/accounts/${accountId}`);
  return response.data;
};

export const updateCashBalance = async (userId: number, balance: number) => {
  const response = await api.patch(`${apiUrl}/users/${userId}/cash-balance`, {
    balance,
  });
  return response.data;
};
