<template>
  <div class="message flex flex-row items-center" :class="{ owner: isOwner }">
    <ui-icon-button
      @click="onDelete()"
      class="!opacity-0 hover:!opacity-100 message-actions !text-gray-400"
      v-if="isOwner"
      icon="delete"
    ></ui-icon-button>
    <div>
      <p class="message-label">
        {{ message.message }}
      </p>
    </div>
    <ui-icon-button
      @click="onDelete()"
      class="!opacity-0 hover:!opacity-100 message-actions !text-gray-400"
      v-if="!isOwner"
      icon="delete"
    ></ui-icon-button>
  </div>
</template>

<script lang="ts">
import { Vue, prop } from "vue-class-component";
import { MessageModel } from "../types/message.model";
class Props {
  message = prop<MessageModel>({ required: true });
}
export default class MessageBuble extends Vue.with(Props) {
  onDelete() {
    this.$emit("onDelete");
  }
  isOwner = false;
  mounted() {
    this.isOwner = this.$sbs.user()?.id === this.message.sender;
  }
}
</script>
<style lang="scss" scoped>
@use "@material/theme" as color;
.message {
  .message-label {
    background-color: #eee;
    padding: 0.5rem;
    border-radius: 8px;
  }
  &.owner {
    align-self: flex-end;
    .message-label {
      background-color: color.$primary;
      color: white;
    }
  }
}

.message-actions {
  transition: opacity 0.5s;
}
// .message {
//   background-color: #eee;
//   padding: 0.5rem;
//   border-radius: 8px;
//   color: black;
//   &.owner {
//     background-color: color.$primary;
//     color: white;
//     align-self: flex-end !important;
//   }
// }
</style>
