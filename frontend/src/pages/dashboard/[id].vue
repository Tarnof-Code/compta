<template>
  <v-container>
    <h1 class="mb-4">Dashboard de {{ authStore.user?.userName }}</h1>

    <v-btn class="mb-7" elevation="2" @click="addAccountDialog = true">
      <v-icon>mdi-plus</v-icon>
      Ajouter un compte
    </v-btn>

    <v-row>
      <v-col cols="12" sm="12" md="6" lg="3">
        <v-card class="mb-4" elevation="2">
          <v-card-title class="d-flex align-center">
            Espèces
            <v-spacer />
            <v-tooltip text="Modifier" location="top">
              <template #activator="{ props }">
                <v-btn
                  icon
                  density="compact"
                  v-bind="props"
                  @click="ouvrirEditionCash()"
                >
                  <v-icon size="16">mdi-pencil</v-icon>
                </v-btn>
              </template>
            </v-tooltip>
          </v-card-title>
          <v-card-text>Solde : {{ authStore.user?.cashBalance }} €</v-card-text>
        </v-card>
      </v-col>
      <v-col
        v-for="(comptes, banque) in comptesParBanque"
        :key="banque"
        cols="12"
        sm="12"
        md="6"
        lg="3"
      >
        <v-card class="mb-4" elevation="2">
          <v-card-title class="text-center">{{ banque }}</v-card-title>
          <v-card-text>
            <v-card
              v-for="compte in comptes"
              :key="compte.accountId"
              class="mb-4"
              elevation="1"
            >
              <v-card-title class="d-flex align-center">
                {{ compte.accountName }}
                <v-spacer />
                <v-tooltip text="Modifier" location="top">
                  <template #activator="{ props }">
                    <v-btn
                      icon
                      density="compact"
                      class="ma-0 pa-0"
                      v-bind="props"
                      @click="ouvrirEditionCompte(compte)"
                    >
                      <v-icon size="16">mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                </v-tooltip>
              </v-card-title>

              <v-card-subtitle>Solde en fin de mois :</v-card-subtitle>
              <v-card-text>Solde actuel : {{ compte.balance }} €</v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Ajouter un compte -->
    <v-dialog v-model="addAccountDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold">
          Ajouter un compte
        </v-card-title>
        <v-card-text>
          <v-form ref="addForm" v-model="formValidAdd">
            <v-text-field
              v-model="newAccount.bankName"
              label="Banque"
              :rules="[(v) => !!v || 'Champ requis']"
            />
            <v-text-field
              v-model="newAccount.accountName"
              label="Nom du compte"
              :rules="[(v) => !!v || 'Champ requis']"
            />
            <v-text-field
              v-model.number="newAccount.balance"
              label="Solde initial (€)"
              type="number"
              :rules="[(v) => v >= 0 || 'Doit être positif']"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="addAccountDialog = false" text>Annuler</v-btn>
          <v-btn
            @click="ajouterCompte"
            :disabled="!formValidAdd"
            color="primary"
            text
            >Créer</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modifier un compte -->
    <v-dialog v-model="editAccountDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold"
          >Modifier le compte</v-card-title
        >
        <v-card-text>
          <v-form ref="editForm" v-model="formValidEdit">
            <v-text-field
              v-model="editedAccount.bankName"
              label="Banque"
              :rules="[(v) => !!v || 'Champ requis']"
            />
            <v-text-field
              v-model="editedAccount.accountName"
              label="Nom du compte"
              :rules="[(v) => !!v || 'Champ requis']"
            />
            <v-text-field
              v-model.number="editedAccount.balance"
              label="Solde (€)"
              type="number"
              :rules="[(v) => v >= 0 || 'Doit être positif']"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="error" @click="supprimerCompte">Supprimer</v-btn>
          <v-spacer />
          <v-btn @click="editAccountDialog = false" text>Annuler</v-btn>
          <v-btn
            @click="modifierCompte"
            :disabled="!formValidEdit"
            color="primary"
            text
            >Modifier</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modifier le solde -->
    <v-dialog v-model="editCashDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold">
          Modifier le solde
        </v-card-title>
        <v-card-text>
          <v-form ref="editCashForm" v-model="formValidEditCash">
            <v-text-field
              v-model.number="editedCash"
              label="Solde (€)"
              type="number"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="editCashDialog = false" text>Annuler</v-btn>
          <v-btn
            @click="modifierSolde"
            :disabled="!formValidEditCash"
            color="primary"
            text
            >Modifier</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      timeout="3000"
      top
      right
    >
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useAccountStore } from "@/stores/accountStore";

const route = useRoute();
const userId = ref<string>((route.params as { id: string }).id);
const authStore = useAuthStore();
const accountStore = useAccountStore();

const addAccountDialog = ref(false);
const editAccountDialog = ref(false);

const formValidAdd = ref(false);
const formValidEdit = ref(false);

const addForm = ref();
const editForm = ref();

const editCashDialog = ref(false);
const formValidEditCash = ref(false);
const editCashForm = ref();
const editedCashId = ref<number | null>(null);

const editedCash = ref(0);

const snackbar = ref(false);
const snackbarMessage = ref("");
const snackbarColor = ref("success");

const newAccount = ref({
  accountName: "",
  bankName: "",
  balance: 0,
});

const editedAccount = ref({
  accountName: "",
  bankName: "",
  balance: 0,
});
const editedAccountId = ref<number | null>(null);

const ajouterCompte = async () => {
  if (!addForm.value?.validate()) return;
  try {
    await accountStore.createAccount(Number(userId.value), newAccount.value);
    newAccount.value = { accountName: "", bankName: "", balance: 0 };
    addAccountDialog.value = false;
    await accountStore.getAccounts(Number(userId.value));
    showSnackbar("Compte créé avec succès !", "success");
  } catch (error) {
    showSnackbar("Erreur lors de la création du compte.", "error");
  }
};

const ouvrirEditionCompte = (compte: any) => {
  editedAccount.value = {
    accountName: compte.accountName,
    bankName: compte.bankName,
    balance: compte.balance,
  };
  editedAccountId.value = compte.id;
  editAccountDialog.value = true;
};

const modifierCompte = async () => {
  if (!editForm.value?.validate() || !editedAccountId.value) return;
  try {
    await accountStore.updateAccount(
      editedAccountId.value,
      editedAccount.value
    );
    editAccountDialog.value = false;
    await accountStore.getAccounts(Number(userId.value));
    showSnackbar("Compte modifié avec succès !", "success");
  } catch (error) {
    showSnackbar("Erreur lors de la modification du compte.", "error");
  }
};

const supprimerCompte = async () => {
  if (!editedAccountId.value) return;
  const confirmation = confirm(
    "Êtes-vous sûr de vouloir supprimer ce compte ?"
  );
  if (!confirmation) return;

  try {
    await accountStore.deleteAccount(editedAccountId.value);
    editAccountDialog.value = false;
    await accountStore.getAccounts(Number(userId.value));
    showSnackbar("Compte supprimé avec succès !", "success");
  } catch (error) {
    showSnackbar("Erreur lors de la suppression du compte.", "error");
  }
};

const ouvrirEditionCash = () => {
  editedCash.value = authStore.user?.cashBalance || 0;
  editedCashId.value = Number(authStore.user?.userId);
  editCashDialog.value = true;
};

const modifierSolde = async () => {
  if (!editCashForm.value?.validate() || !editedCashId.value) return;
  try {
    await accountStore.updateCashBalance(editedCashId.value, editedCash.value);
    await authStore.fetchUser();
    editCashDialog.value = false;
    // await accountStore.getAccounts(Number(userId.value));
    showSnackbar("Solde modifié avec succès !", "success");
  } catch (error) {
    showSnackbar("Erreur lors de la modification du solde.", "error");
  }
};

const showSnackbar = (message: string, color: string) => {
  snackbarMessage.value = message;
  snackbarColor.value = color;
  snackbar.value = true;
};

onMounted(() => {
  accountStore.getAccounts(Number(userId.value));
});

const comptesParBanque = computed(() => {
  const comptes = accountStore.accounts;
  const groupes: Record<string, (typeof comptes)[0][]> = {};

  const normalizeString = (str: string) => {
    return str
      .normalize("NFD") // décompose accents
      .replace(/[\u0300-\u036f]/g, "") // supprime les accents
      .toLowerCase()
      .trim();
  };

  const formatBankName = (str: string) => {
    const normalized = normalizeString(str);
    return normalized.charAt(0).toUpperCase() + normalized.slice(1);
  };

  for (const compte of comptes) {
    const banqueNormalisee = formatBankName(compte.bankName);
    if (!groupes[banqueNormalisee]) groupes[banqueNormalisee] = [];
    groupes[banqueNormalisee].push(compte);
  }

  return groupes;
});
</script>
