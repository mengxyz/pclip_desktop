<template>
  <!-- <RoomSettingDialog v-model:dialog="openSetting" :id="room?.id" /> -->
  <router-view />
  <div
    class="tw-flex tw-flex-col tw-gap-3 tw-h-full tw-p-2"
    ref="conversations"
  >
    <div
      class="tw-flex tw-flex-col tw-gap-3 tw-h-full tw-overflow-y-auto"
      ref="conversations"
    >
      <template v-for="message in messages" :key="message.id">
        <MessageBuble
          v-for="i in 1"
          :key="i"
          :message="message"
          @onDelete="deleteMessage(message.id)"
        />
      </template>
      <!-- <p v-for="i in 100" :key="i">Hello</p> -->
    </div>
    <div
      class="tw-flex tw-flex-row tw-gap-2 tw-w-full tw-items-center !tw-mb-[60px]"
    >
      <v-btn
        @click="$router.push('/setting')"
        icon="mdi-cog"
        size="small"
        class="!tw-shadow-none text-primary"
      ></v-btn>
      <v-textarea
        v-model="messageInput"
        persistent-placeholder
        hide-details
        label="Aa"
        rows="1"
        no-resize
        max-rows="3"
      ></v-textarea>
      <v-btn
        icon="mdi-alarm"
        size="small"
        class="!tw-shadow-none text-primary"
      ></v-btn>
      <v-btn
        @click="sendMessage()"
        icon="mdi-send"
        size="small"
        class="!tw-shadow-none text-primary"
      ></v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { RealtimeSubscription } from "@supabase/supabase-js";
import { Vue, Options, prop } from "vue-class-component";
import RoomSettingDialog from "../components/RoomSettingDialog.vue";
import { MessageModel } from "../types/message.model";
import MessageBuble from "../components/MessageBuble.vue";
import { MessageEncrypter } from "../utils/message-encrypter";
import { RoomModel } from "../types/room.model";
import { RoomService } from "../services/room.service";

@Options({
  components: { RoomSettingDialog, MessageBuble },
})
export default class RoomVue extends Vue {
  room?: RoomModel;
  openSetting = false;
  subscribe?: RealtimeSubscription;
  messages: Array<MessageModel> = [];
  encrypter?: MessageEncrypter;
  roomService: RoomService = new RoomService(this.room?.id!);
  messageInput = "";
  declare $refs: {
    conversations: HTMLDivElement;
  };
  isLoading = false;
  async toggleLoader() {
    this.isLoading = !this.isLoading;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.isLoading = !this.isLoading;
  }
  onChange(change: Array<MessageModel>) {
    this.messages = change;
  }
  inputCallBack(event: Event) {
    const textArea = event.target as HTMLTextAreaElement | null;
    if (textArea != null) {
      textArea.style.height = "auto";
      textArea.style.height = textArea.scrollHeight + "px";
    }
  }
  sendMessage() {
    this.roomService.sendMessage(
      this.room!.id,
      this.messageInput,
      this.encrypter!
    );
    this.messageInput = "";
  }
  deleteMessage(id: string) {
    this.roomService.deleteMessage(id);
  }
  created() {
    this.room = this.$route.params as unknown as RoomModel;
    console.log("Create", this.room!.id);
    const secret = localStorage.getItem(this.room!.id)!;
    this.encrypter = new MessageEncrypter(secret, this.room!.iv);
    this.$watch("messages", () => console.log(this.messages));
  }
  async mounted() {
    this.$refs.conversations.scrollTop = this.$refs.conversations.scrollHeight;
    this.subscribe = await this.roomService.messageObserver(
      this.room!.id,
      this.encrypter!,
      this.onChange
    );
  }
  unmounted() {
    this.subscribe?.unsubscribe();
  }
  updated() {}
}
</script>
