<template>
  <v-container>
    <h1>Dashboard de {{ authStore.user?.userName }}</h1>
  </v-container>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";

const route = useRoute();
const userId = ref<string>((route.params as { id: string }).id);
const authStore = useAuthStore();
</script>
