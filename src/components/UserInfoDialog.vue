<template>
  <ui-dialog
    :modelValue="dialog"
    :maskClosable="true"
    @update:modelValue="$emit('update:dialog', $event)"
  >
    <ui-dialog-title>User Info</ui-dialog-title>
    <ui-dialog-content>
      <p>Awsome User Content</p>
      <p v-if="!$sbs.isAnon()">
        <strong>Email: </strong> {{ $sbs.user()?.email }}
      </p>
      <strong v-else> Use Device sessions </strong>
    </ui-dialog-content>
    <ui-dialog-actions>
      <template #default="{ buttonClass }">
        <ui-button :class="buttonClass" @click="closeDialog()">Close</ui-button>
        <ui-button
          :class="[
            buttonClass,
            $theme.getThemeClass('error'),
            $theme.getThemeColor('error'),
          ]"
          @click="signOut"
          >Signout</ui-button
        >
      </template>
    </ui-dialog-actions>
  </ui-dialog>
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
  //   created() {
  //     this.$watch("dialog", () => {
  //       console.debug("Change ", this.dialog);
  //     });
  //   }
}
</script>
