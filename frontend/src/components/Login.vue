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
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Mot de passe"
            clearable
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
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
const rules = {
  required: (value: string) => !!value || "Ce champ est obligatoire",
};
const userName = ref("");
const password = ref("");

const handleLogin = () => {
  console.log(userName.value, password.value);
};
</script>
