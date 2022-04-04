<template>
  <v-form ref="form">
    <div
      class="tw-flex tw-justify-center tw-items-center tw-h-screen tw-w-screen"
    >
      <div class="tw-w-10/12 tw-flex tw-flex-col">
        <v-text-field
          color="primary"
          label="Email"
          placeholder="Email"
          v-model="email"
          input-type="email"
          :rules="[rules.email]"
        ></v-text-field>

        <v-text-field
          v-model="password"
          type="password"
          name="input-10-1"
          label="Password"
          placeholder="Password"
          :rules="[rules.minimum]"
          hint="At least 8 characters"
          counter
        ></v-text-field>

        <div class="tw-flex tw-flex-col tw-gap-3">
          <v-btn @click="signIn()" color="primary" :disabled="loader"
            >Signin</v-btn
          >
          <v-btn
            @click="createDeviceSession()"
            class="!tw-bg-cyan-500 !tw-text-white"
            :disabled="loader"
            >Usedevice Sesssion</v-btn
          >
        </div>
      </div>
    </div>
  </v-form>
  <v-snackbar v-model="showError" color="error">
    {{ error }}
  </v-snackbar>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { InputValidator } from "../lib/input-validator";
import { useAuthStore } from "../store/authStore";

export default class SignInView extends Vue {
  store = useAuthStore();
  error = "";
  showError = false;
  loader = false;
  email = "";
  password = "";
  openSetPinDialog = false;
  declare $refs: {
    form: HTMLFormElement;
  };
  rules = {
    required: InputValidator.required,
    minimum: (v: string) => InputValidator.min(v, 8),
    email: InputValidator.validEmail,
  };
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
    try {
      this.loader = true;
      const session = this.store.deviceSession!;
      this.store.deviceSession = await this.$sbs.setSession(session);
    } catch (err: any) {
      this.error = err;
      this.showError = true;
    } finally {
      this.loader = false;
    }
  }
  mounted() {
    this.$watch("email", () => this.$refs.form.validate());
    this.$watch("password", () => this.$refs.form.validate());
  }
}
</script>
