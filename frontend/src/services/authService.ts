import api from "@/plugins/axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const getToken = (): string | null => {
  return localStorage.getItem("access_token");
};

export const saveToken = (token: string) => {
  localStorage.setItem("access_token", token);
};

export const clearToken = () => {
  localStorage.removeItem("access_token");
};

export const login = async (userName: string, userPassword: string) => {
  console.log(userName, userPassword);
  const response = await api.post(`${apiUrl}/auth/login`, {
    userName,
    userPassword,
  });
  const token = response.data.access_token;
  saveToken(token);
  return token;
};

export const logout = () => {
  clearToken();
};

export const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

export const isAuthenticated = async (): Promise<
  | false
  | {
      cashBalance: number;
      userName: string;
      userId: string;
    }
> => {
  const token = getToken();
  if (!token) {
    return false;
  }
  try {
    const profile = await getProfile();
    return {
      userId: profile.userId,
      userName: profile.userName,
      cashBalance: profile.cashBalance,
    };
  } catch {
    clearToken();
    return false;
  }
};
