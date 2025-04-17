import { defineStore } from "pinia";
import type { User } from "@/types/User";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: undefined as User | undefined,
  }),

  actions: {
    setUser(user: User) {
      this.user = user;
    },
    logOut() {
      this.user = undefined;
    },
  },
});
