<template>
  <div
    class="message tw-flex tw-flex-row tw-items-center"
    :class="{ owner: isOwner }"
  >
    <v-btn
      @click="onDelete()"
      class="tw-opacity-0 hover:tw-opacity-100 message-actions !tw-text-gray-400 !tw-shadow-none tw-mr-2"
      icon="mdi-delete"
      v-if="isOwner"
    ></v-btn>
    <div>
      <p class="message-label">
        {{ message.message }}
      </p>
    </div>
    <v-btn
      @click="onDelete()"
      class="tw-opacity-0 hover:tw-opacity-100 message-actions !tw-text-gray-400 !tw-shadow-none tw-ml-2"
      icon="mdi-delete"
      v-if="!isOwner"
    ></v-btn>
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
.message {
  .message-label {
    padding: 0.5rem;
    border-radius: 8px;
  }
  &.owner {
    align-self: flex-end;
  }
}

.v-theme--dark {
  .message-label {
    @apply tw-bg-dark-200;
  }
  .message {
    &.owner {
      .message-label {
        @apply tw-bg-purple-400;
      }
    }
  }
}
.v-theme--light {
  .message-label {
    @apply tw-bg-light-900;
  }
}

.message-actions {
  transition: opacity 0.5s;
}
</style>
