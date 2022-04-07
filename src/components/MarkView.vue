<template>
  <div ref="body"></div>
</template>

<script lang="ts">
import { Vue, prop } from "vue-class-component";
import { marked } from "marked";
class Props {
  body = prop<string>({ required: false, default: "" });
}
export default class MarkView extends Vue.with(Props) {
  declare $refs: {
    body: HTMLDivElement;
  };
  mounted() {
    this.$refs.body.innerHTML = marked.parse(this.body);
  }
}
</script>
