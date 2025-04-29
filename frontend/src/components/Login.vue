<template>
  <v-container class="d-flex justify-center align-center h-100">
    <v-card class="pa-5 mb-10" width="500" height="350">
      <v-card-title class="text-center text-h5">Connexion</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="userName"
            label="Nom d'utilisateur"
            clearable
            append-icon="mdi-account"
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Mot de passe"
            clearable
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :rules="[rules.required]"
          ></v-text-field>
          <v-btn
            type="submit"
            color="primary"
            block
            :disabled="!userName || !password"
          >
            Se connecter
          </v-btn>
          <p class="text-red mt-2">{{ errorMessage }}</p>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { login, getProfile, isAuthenticated } from "@/services/authService";
import { ref, type Ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const authStore = useAuthStore();
const showPassword = ref(false);
onMounted(async () => {
  const response = await isAuthenticated();
  if (response) {
    router.push(`/dashboard/${response.userId}`);
  }
});

const rules = {
  required: (value: string) => !!value || "Ce champ est obligatoire",
};
const userName: Ref<string> = ref("");
const password: Ref<string> = ref("");
const errorMessage = computed(() => authStore.error);

const handleLogin = async () => {
  await authStore.loginUser(userName.value, password.value);
  if (authStore.isLoggedIn) {
    router.push(`/dashboard/${authStore.user?.userId}`);
  }
};
</script>
