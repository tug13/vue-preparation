<template>
  <div
    class="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
    <h1 class="font-bold text-2xl">Login</h1>
    <form
      class="flex flex-col bg-white rounded shadow-lg p-12 mt-12"
      @submit.prevent="login">
      <label class="font-semibold text-xs" for="usernameField"
        >Username or Email</label
      >
      <input
        v-model="infoUser.mail"
        class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
        type="text" />
      <label class="font-semibold text-xs mt-3" for="passwordField"
        >Password</label
      >
      <div class="flex">
        <div>
          <input
            :type="passwordFieldType"
            v-model="infoUser.password"
            class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" />
        </div>
        <div class="flex items-center mt-2 pl-2">
          <span
            v-if="hidePassword !== true"
            @click="hidePassword = !hidePassword">
            <i class="fas fa-eye"></i>
          </span>
          <span v-else @click="hidePassword = !hidePassword">
            <i class="fa-solid fa-eye-slash"></i>
          </span>
        </div>
      </div>
      <button
        type="submit"
        class="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700">
        Login
      </button>
    </form>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import axios from "axios";
import router from "@/router";
const infoUser = ref({
  mail: "",
  password: "",
});
const hidePassword = ref(true);
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const login = async () => {
  let result = await axios.get("http://localhost:3001/profile");
  let userInfo = result.data;
  if (
    userInfo.email === infoUser.value.mail &&
    userInfo.password === infoUser.value.password
  ) {
    let email = userInfo.email.toString().split``.map((x) => x.charCodeAt())
      .join`a`;
    let password = userInfo.password.toString().split``.map((x) =>
      x.charCodeAt()
    ).join`a`;
    let token = email + ".Ac" + password;
    localStorage.setItem("currentToken", JSON.stringify(token));
    router.push("/home");
  }
};
</script>
<style></style>
