<template>
  <div>
    {{ info }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data: () => ({
      info: `HOST ${location.host} PORT ${location.port}`
  }),
});
</script>
