<template>
  <div class="flex justify-center items-center h-screen w-screen">
    <div class="w-10/12 flex flex-col">
      <ui-textfield v-model="email" class="mb-3" input-type="email" required>
        Email
      </ui-textfield>

      <ui-textfield
        v-model="password"
        input-type="password"
        required
        pattern=".{8,}"
        helper-text-id="pw-validation-msg"
        :attrs="{ autocomplete: 'current-password' }"
      >
        Password
      </ui-textfield>
      <ui-textfield-helper class="mb-3" id="pw-validation-msg" visible validMsg>
        Must be at least 8 characters long
      </ui-textfield-helper>

      <ui-button @click="signIn()" class="mb-3" :disabled="loader" raised
        >Signin</ui-button
      >
      <ui-button
        @click="createDeviceSession()"
        class="!bg-green-400 !text-black"
        :disabled="loader"
        raised
        >Usedevice Sesssion</ui-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { useAuthStore } from "../store/authStore";

export default class SignInView extends Vue {
  store = useAuthStore();
  error = "";
  loader = false;
  email = "";
  password = "";
  openSetPinDialog = false;
  githubSignIn() {
    this.$sbs.signInWithGithub();
  }
  async signIn() {
    this.loader = true;
    const err = await this.$sbs.signInEmailPassword(this.email, this.password);
    if (err) {
      this.error = err.message;
    }
    this.loader = false;
  }
  async createDeviceSession() {
    this.loader = true;
    const session = this.store.deviceSession!;
    this.store.deviceSession = await this.$sbs.setSession(session);
    this.loader = false;
  }
}
</script>
