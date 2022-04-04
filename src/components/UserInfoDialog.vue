<template>
  <v-dialog :model-value="true">
    <v-card>
      <v-card-title>User Info</v-card-title>
      <v-card-text>
        <p>Awsome User Content</p>
        <p v-if="!$sbs.isAnon()">
          <strong>Email: </strong> {{ $sbs.user()?.email }}
        </p>
        <strong v-else> Use Device sessions </strong>
      </v-card-text>
      <v-card-actions class="tw-justify-end">
        <v-btn color="error" @click="signOut()"> Signout </v-btn>
        <v-btn color="primary" @click="$router.push('/')"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, prop } from "vue-class-component";
class Props {
  dialog = prop({ type: Boolean, default: false });
}
export default class UserInfoDialog extends Vue.with(Props) {
  closeDialog() {
    this.$emit("update:dialog", false);
  }
  async signOut() {
    const result = await this.$sbs.singOut();
    console.debug(result);
    if (result) {
      this.$router.push("/signin");
    }
  }
}
</script>
