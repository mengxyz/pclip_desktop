<template>
  <v-dialog persistent>
    <v-card>
      <v-card-title class="text-h5"> Confirmation ? </v-card-title>
      <v-card-text class="!tw-pt-0"><slot> Default Content </slot></v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green" text @click="$emit('update:modelValue', false)">
          Cancel
        </v-btn>
        <v-btn color="green" text @click="confirm()"> Confirm </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class ConfirmDialog extends Vue {
  confirm() {
    this.$emit("update:modelValue", false);
    this.$emit("confirm");
  }
}
</script>
