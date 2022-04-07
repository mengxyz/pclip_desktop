<template>
  <div>
    <v-dialog :modelValue="true" width="600">
      <v-card class="tw-w-[500px]">
        <v-card-title primary-title> Join room </v-card-title>
        <v-card-text>
          <v-form ref="form" :disabled="loading">
            <v-text-field
              :rules="[rules.required, rules.minimum]"
              v-model="inviteCode"
              label="Invite Code"
              color="primary"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required, rules.minimum]"
              label="Invite Secret"
              v-model="inviteSecret"
              color="primary"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-progress-linear
          indeterminate
          color="primary"
          v-if="loading"
        ></v-progress-linear>
        <v-card-actions class="tw-justify-end">
          <v-btn
            variant="text"
            :color="loading || 'primary'"
            @click="$router.back()"
            :disabled="loading"
            >Close</v-btn
          >
          <v-btn
            loading
            variant="text"
            :color="loading || 'primary'"
            @click="onConfirm()"
            :disabled="loading"
          >
            Join</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, prop } from "vue-class-component";
import { InputValidator } from "../lib/input-validator";

class Props {
  dialog = prop({ type: Boolean, default: false });
}

export default class JoinRoomDialog extends Vue.with(Props) {
  inviteCode = "";
  inviteSecret = "";
  loading = false;
  rules = {
    required: InputValidator.required,
    minimum: (v: string) => InputValidator.min(v, 6),
  };
  declare $refs: {
    form: HTMLFormElement;
  };
  onClose() {
    this.inviteCode = "";
    this.inviteSecret = "";
  }
  async onConfirm() {
    // this.$refs.form.validate();
    this.loading = true;
    await new Promise((reslove) => setTimeout(reslove, 2000));
    this.loading = false;
    if (this.inviteCode.length == 6 && this.inviteSecret.length == 6) {
      this.$emit("onConfirm", {
        code: this.inviteCode,
        secret: this.inviteSecret,
      });
    }
    // this.$emit("update:dialog", false);
  }
}
</script>
