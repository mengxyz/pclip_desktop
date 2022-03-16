<template>
  <ui-dialog
    :modelValue="dialog"
    :maskClosable="true"
    @update:modelValue="$emit('update:dialog', $event)"
  >
    <ui-dialog-content>
      <div class="flex flex-row gap-4 items-center">
        <ui-spinner active></ui-spinner>
        <p>Progress...</p>
      </div>
    </ui-dialog-content>
  </ui-dialog>
</template>

<script lang="ts">
import { Vue, prop } from "vue-class-component";
class Props {
  dialog = prop({ type: Boolean, default: false });
}
export default class ProgressDialog extends Vue.with(Props) {}
</script>
