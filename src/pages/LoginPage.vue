<template>
  <q-page class="row justify-center">
    <div class="col-12 col-sm-6 col-md-5">
      <h3>Login {{ userStore.token }}</h3>
      <q-form @submit.prevent="handlerSubmit">
        <q-input
          type="email"
          v-model="email"
          label="Ingrese email"
          :rules="[
            (val) =>
              (val && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) ||
              'Formato email incorrecto',
          ]"
        ></q-input>
        <q-input
          type="password"
          v-model="password"
          label="Ingrese contraseña"
          :rules="[
            (val) =>
              (val && val.length > 5) || 'Contraseña minimo 6 caracteres',
          ]"
        ></q-input>
        <q-btn label="Login" type="submit"></q-btn>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user-store";

const userStore = useUserStore();
const $q = useQuasar();
const router = useRouter();

const email = ref("rigo@test.com");
const password = ref("123123");

const handlerSubmit = async () => {
  try {
    const res = await userStore.access(email.value, password.value);
    router.push("/");
    email.value = null;
    password.value = null;
  } catch (error) {
    console.log("error ", error);
    alertDialogBackend(error.error);
  }
};

const alertDialogBackend = (message = "Error en el servidor") => {
  $q.dialog({
    title: "Error",
    message,
  });
};
</script>
