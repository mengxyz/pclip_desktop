<template>
  <div class="tw-h-screen">
    <v-layout class="tw-h-full">
      <v-navigation-drawer floating permanent class="">
        <div class="tw-h-full tw-flex-col tw-flex custom-navigator">
          <div class="tw-p-6 tw-flex tw-flex-row tw-items-center">
            <p class="text-h6">Chats</p>
            <v-spacer></v-spacer>
            <v-btn
              icon="mdi-plus-circle"
              class="!tw-shadow-none"
              size="small"
              @click="$router.push('/join')"
              >text</v-btn
            >
            <v-btn
              icon="mdi-export"
              class="!tw-shadow-none"
              size="small"
              @click="$router.push('/setting')"
            ></v-btn>
            <v-btn icon size="small" class="!tw-shadow-none">
              <v-icon @click="appStore.toggleTheme()">
                {{
                  appStore.isDark
                    ? "mdi-white-balance-sunny"
                    : "mdi-weather-night"
                }}</v-icon
              >
            </v-btn>
          </div>
          <v-divider></v-divider>
          <div
            v-if="rooms.length === 0"
            class="tw-h-full tw-flex tw-justify-center tw-items-center"
          >
            <p>No room avilable</p>
          </div>
          <room v-for="room in rooms" :key="room.id" :room="room" />
        </div>
      </v-navigation-drawer>
      <v-main>
        <router-view :key="$route.params.id ?? Date.now()" />
      </v-main>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { RealtimeSubscription } from "@supabase/realtime-js";
import { Vue, Options, setup } from "vue-class-component";
import Room from "../components/Room.vue";
// import UserInfoDialog from "../components/UserInfoDialog.vue";
import { RoomModel } from "../types/room.model";
// import JoinRoomDialog from "../components/JoinRoomDialog.vue";
import { Events } from "../types/events";
import { useAppStore } from "../store/appStore";
import useEventBus from "../composables/useEventBus";

@Options({
  components: { Room /*UserInfoDialog, JoinRoomDialog*/ },
})
export default class MainView extends Vue {
  context = setup(() => {
    const { on } = useEventBus();
    return { on };
  });
  openUserDialog = false;
  openJoinRoomDialog = false;
  isLoading = false;
  rooms: Array<RoomModel> = [];
  subscribe: RealtimeSubscription | null = null;
  appStore = useAppStore();
  onChange(change: Array<RoomModel>) {
    this.rooms = change;
  }
  async subscribeRoom() {
    this.subscribe = await this.$sbs.observeRooms(this.onChange);
  }
  unSubscribeRoom() {
    this.subscribe?.unsubscribe();
  }
  async created() {
    await this.subscribeRoom();
  }
  mounted() {
    this.context.on(Events.REFRESH_ROOMS, (_) => {
      console.log("Event resive");
      this.unSubscribeRoom();
      this.subscribeRoom();
    });
  }
  unmounted() {
    console.debug("Unsubcribe");
    this.unSubscribeRoom();
  }
  singOut() {
    this.$sbs.singOut();
  }
  async joinRoom(secret: { code: string; secret: string }) {
    try {
      await this.$apiService.joinRoom(
        secret.code,
        secret.secret,
        this.$sbs.accessToken()!
      );
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-navigator {
  border-top-style: none !important;
  border-left-style: none !important;
  border-bottom-style: none !important;
  @apply tw-border-solid tw-border-[1px];
}
.v-theme--dark {
  .custom-navigator {
    @apply tw-border-dark-200;
  }
}
.v-theme--light {
  .custom-navigator {
    @apply tw-border-light-900;
  }
}
</style>
