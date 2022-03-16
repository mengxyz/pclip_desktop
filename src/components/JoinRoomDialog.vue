<template>
  <ui-dialog
    :modelValue="dialog"
    :maskClosable="true"
    @update:modelValue="$emit('update:dialog', $event)"
    @close="onClose()"
  >
    <ui-dialog-title>Join room</ui-dialog-title>
    <ui-dialog-content>
      <div class="flex flex-col gap-4 items-center">
        <ui-textfield minlength="6" v-model="inviteCode" class="w-full">
          Invite Code</ui-textfield
        >
        <ui-textfield minlength="6" v-model="inviteSecret" class="w-full">
          Invite Secret
        </ui-textfield>
      </div>
    </ui-dialog-content>
    <ui-dialog-actions>
      <ui-button @click="$emit('update:dialog', false)">Close</ui-button>
      <ui-button @click="onConfirm()">Join</ui-button>
    </ui-dialog-actions>
  </ui-dialog>
</template>

<script lang="ts">
import { Vue, Options, prop } from "vue-class-component";
import Pin from "./Pin.vue";

class Props {
  dialog = prop({ type: Boolean, default: false });
}

@Options({
  components: { Pin },
})
export default class JoinRoomDialog extends Vue.with(Props) {
  inviteCode = "";
  inviteSecret = "";
  onClose() {
    this.inviteCode = "";
    this.inviteSecret = "";
  }
  onConfirm() {
    if (this.inviteCode.length == 6 && this.inviteSecret.length == 6) {
      this.$emit("onConfirm", {
        code: this.inviteCode,
        secret: this.inviteSecret,
      });
    }
    this.$emit("update:dialog", false);
  }
}
</script>
