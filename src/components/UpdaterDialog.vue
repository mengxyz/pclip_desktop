<template>
  <ui-dialog
    :modelValue="dialog"
    @update:modelValue="$emit('update:dialog', $event)"
  >
    <ui-dialog-title
      >New upadate avilable ({{ manifest?.version }})</ui-dialog-title
    >
    <ui-dialog-content>
      <div class="flex flex-col gap-4 items-start">
        <div class="pt-3" ref="body"></div>
      </div>
    </ui-dialog-content>
    <ui-dialog-actions>
      <ui-button @click="$emit('update:dialog', false)">Close</ui-button>
      <ui-button @click="install()"> Install </ui-button>
    </ui-dialog-actions>
  </ui-dialog>
</template>

<script lang="ts">
import { Vue, prop } from "vue-class-component";
import { UpdateManifest } from "@tauri-apps/api/updater";
import { marked } from "marked";
class Props {
  dialog = prop<Boolean>({ default: false });
  manifest = prop<UpdateManifest>({ required: false });
}
export default class UpdaterDialog extends Vue.with(Props) {
  body = "";
  updated() {
    (this.$refs.body as HTMLDivElement).innerHTML = marked.parse(
      this.manifest?.body ?? ""
    );
  }
  install() {
    this.$emit("install");
    this.$emit("update:dialog", false);
  }
}
</script>
