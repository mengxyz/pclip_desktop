<template>
  <v-dialog :model-value="true">
    <v-card>
      <v-card-text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="back()" block>Close Dialog</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class Settings extends Vue {
  back() {
    try {
      this.$router.go(-1);
    } catch (error) {
      console.error(error);
    }
  }
}
</script>
