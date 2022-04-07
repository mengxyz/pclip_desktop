<template>
  <v-dialog
    :modelValue="dialog"
    transition="dialog-transition"
    @update:modelValue="$emit('update:dialog', $event)"
  >
    <v-card>
      <v-card-title primary-title>
        New upadate avilable ({{ manifest?.version }})
      </v-card-title>
      <v-card-text class="!tw-pt-1">
        <MarkView :body="manifest?.body ?? ''" />
      </v-card-text>
      <v-card-actions class="tw-justify-end">
        <v-btn @click="$emit('update:dialog', false)" color="primary"
          >Close</v-btn
        >
        <v-btn @click="install()" color="primary"> Install </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, prop, Options } from "vue-class-component";
import { UpdateManifest } from "@tauri-apps/api/updater";
import MarkView from "./MarkView.vue";
class Props {
  dialog = prop<Boolean>({ default: false });
  manifest = prop<UpdateManifest | null>({ required: false, default: null });
}
@Options({
  components: { MarkView },
})
export default class UpdaterDialog extends Vue.with(Props) {
  body = "";
  install() {
    this.$emit("install");
    this.$emit("update:dialog", false);
  }
}
</script>
