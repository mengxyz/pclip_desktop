<template>
  <div class="flex flex-row gap-5">
    <template v-for="i in lenght" :key="i">
      <input
        type="text"
        v-on:keydown="autoFocus($event)"
        :id="`pin-input-${i}`"
        maxlength="1"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, prop } from "vue-class-component";
class Props {
  lenght = prop<number>({ required: true });
}
export default class Pin extends Vue.with(Props) {
  autoFocus(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.value.length != 0) {
      (target.nextElementSibling as HTMLInputElement | null)?.focus();
    } else {
      (target.previousElementSibling as HTMLInputElement | null)?.focus();
    }
  }
}
</script>
<style lang="scss" scoped>
input {
  width: 50px;
  height: 50px;
  border: solid black;
  text-align: center;
}
</style>
