<template>
  <div class="flex items-center justify-center h-screen">
    <div class="flex flex-col gap-3">
      <ui-textfield v-model="email" class="mb-3" input-type="email" required>
        Email
      </ui-textfield>
      <ui-textfield v-model="password" class="mb-3" input-type="email" required>
        Password
      </ui-textfield>
      <ui-button
        @click="signUp()"
        :disable="loader"
        class="mb-3"
        :disabled="false"
        raised
        >Signup</ui-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class SignUpView extends Vue {
  error = "";
  loader = false;
  email = "";
  password = "";
  async signUp() {
    this.loader = true;
    const err = await this.$sbs.signUp(this.email, this.password);
    if (err != null) {
      this.error = err.message;
    }
    this.loader = false;
  }
}
</script>
<style scoped lang="scss"></style>
