<template>
  <v-navigation-drawer app permanent width="60">
    <v-list>
      <v-list-item v-tooltip="'Se déconnecter'" link @click="handleLogout">
        <v-icon>mdi-logout</v-icon>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logoutUser();
  router.push("/login");
};
</script>
