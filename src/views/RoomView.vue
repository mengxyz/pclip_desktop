<template>
  <RoomSettingDialog v-model:dialog="openSetting" :id="room?.id" />
  <router-view />
  <v-layout class="tw-h-full">
    <v-navigation-drawer permanent position="right" class="!tw-h-full">
      <template v-slot:prepend>
        <v-list-item
          two-line
          :prepend-avatar="'https://avatars.dicebear.com/api/initials/ds.svg?r=50&backgroundColors[]=grey'"
          :title="$sbs.isAnon() ? 'Device Session' : $sbs.user()?.email"
          :subtitle="$sbs.user()?.role"
        ></v-list-item>
        <v-divider></v-divider>
      </template>

      <div class="tw-flex tw-flex-col tw-h-full">
        <div class="tw-flex tw-flex-row tw-gap-2 tw-px-2">
          <p
            class="tab-item"
            @click="tab = 'member'"
            :class="{ selected: tab === 'member' }"
          >
            Member
          </p>
          <p
            class="tab-item"
            @click="tab = 'setting'"
            :class="{ selected: tab === 'setting' }"
          >
            Setting
          </p>
        </div>
        <div class="tw-flex-grow tw-h-full">
          <v-window v-model="tab" class="tw-h-full">
            <v-window-item value="member" class="tw-h-full">
              <MemberSetting :id="room?.id" ref="memberPage" />
            </v-window-item>
            <v-window-item value="setting" class="tw-h-full">
              <RoomSetting :id="room?.id" ref="settingPage" />
            </v-window-item>
          </v-window>
        </div>
      </div>
    </v-navigation-drawer>
    <v-main>
      <v-toolbar color="surface" elevation="2">
        <div class="text-h6">{{ room?.name }}</div>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon @click="$router.push('/')">mdi-close-circle</v-icon>
        </v-btn>
      </v-toolbar>
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
        </div>
        <div
          class="tw-flex tw-flex-row tw-gap-2 tw-w-full tw-items-center !tw-mb-[60px]"
        >
          <v-btn
            @click="openSetting = true"
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
    </v-main>
  </v-layout>
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
import MemberSetting from "../components/MemberSetting.vue";
import RoomSetting from "../components/RoomSetting.vue";

@Options({
  components: { RoomSettingDialog, MessageBuble, MemberSetting, RoomSetting },
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
    memberPage?: any;
    settingPage?: any;
  };
  isLoading = false;
  tab: "member" | "setting" = "member";
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
    console.log("Create", this.room);
    const secret = localStorage.getItem(this.room!.id)!;
    this.encrypter = new MessageEncrypter(secret, this.room!.iv);
    this.$watch("messages", () => console.log(this.messages));
  }
  updated() {
    console.log("Create", this.room);
  }
  async mounted() {
    this.$refs.conversations.scrollTop = this.$refs.conversations.scrollHeight;
    this.subscribe = await this.roomService.messageObserver(
      this.room!.id,
      this.encrypter!,
      this.onChange
    );
    this.$watch(
      "tab",
      () => {
        if (this.tab == "member") {
          this.$refs.memberPage?.init();
        } else {
          this.$refs.memberPage?.dispose();
        }
        if (this.tab == "setting") {
          this.$refs.settingPage?.init();
        }
      },
      { immediate: true }
    );
  }
  unmounted() {
    this.subscribe?.unsubscribe();
  }
}
</script>
<style lang="scss" scoped>
.tab-item {
  @apply tw-flex-grow tw-text-center tw-px-3 tw-py-2 tw-cursor-pointer;
  border-bottom: solid 2px transparent;
  transition: 0.3s ease-in-out;
}
.v-theme--dark {
  .tab-item {
    &:hover {
      @apply tw-bg-dark-50;
    }
    &.selected {
      border-bottom: solid white 2px;
    }
  }
}
.v-theme--light {
  .tab-item {
    &:hover {
      @apply tw-bg-light-900;
    }
    &.selected {
      border-bottom: solid black 2px;
    }
  }
}
</style>
