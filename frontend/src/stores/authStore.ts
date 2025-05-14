import { defineStore } from "pinia";
import { ref } from "vue";
import {
  login,
  logout,
  getProfile,
  isAuthenticated,
} from "@/services/authService";
import type { User } from "@/types/User";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const isLoggedIn = computed(() => !!user.value);

  const loginUser = async (username: string, password: string) => {
    loading.value = true;
    error.value = null;
    try {
      await login(username, password);
      const profile = await getProfile();
      user.value = {
        userId: profile.userId,
        userName: profile.userName,
        cashBalance: profile.cashBalance,
      };
    } catch (err: any) {
      error.value = err.response.data.error;
      console.error("Login failed:", err);
    } finally {
      loading.value = false;
    }
  };

  const logoutUser = () => {
    logout();
    user.value = null;
  };

  const checkAuth = async () => {
    const result = await isAuthenticated();
    if (result) {
      user.value = {
        userId: result.userId,
        userName: result.userName,
        cashBalance: result.cashBalance,
      };
    } else {
      user.value = null;
    }
  };

  return {
    user,
    loading,
    error,
    isLoggedIn,
    loginUser,
    logoutUser,
    checkAuth,
  };
});
