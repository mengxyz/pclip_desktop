<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "App",

  components: {},

  data: () => ({
    //
  }),
});
</script>
<style lang="scss">
body,
html {
  padding: 0;
  margin: 0;
}
</style>
