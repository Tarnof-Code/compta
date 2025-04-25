<template>
  <v-main>
    <Sidebar />
    <router-view />
  </v-main>
</template>

<script lang="ts" setup>
import Sidebar from "@/components/Sidebar.vue";
</script>
