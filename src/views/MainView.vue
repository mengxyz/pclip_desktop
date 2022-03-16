<template>
  <UserInfoDialog v-model:dialog="openUserDialog" />
  <JoinRoomDialog v-model:dialog="isLoading" @onConfirm="joinRoom($event)" />
  <div class="hall-container">
    <ui-top-app-bar
      content-selector=".hall-content"
      :nav-icon="false"
      :type="0"
    >
      <p class="hover:cursor-pointer" @click="$router.push('/')">Pclip</p>
      <template #toolbar="{ toolbarItemClass }">
        <ui-icon-button
          @click="openUserDialog = true"
          :class="toolbarItemClass"
          icon="person"
        ></ui-icon-button>
      </template>
    </ui-top-app-bar>
    <div class="hall-content">
      <ui-drawer viewport-height>
        <ui-drawer-header>
          <ui-drawer-title>Room</ui-drawer-title>
        </ui-drawer-header>
        <ui-drawer-content>
          <div
            v-if="rooms.length === 0"
            class="h-full flex justify-center items-center flex-col gap-2"
          >
            <p>No room avilable</p>
            <ui-button @click="isLoading = !isLoading" icon="add_circle"
              >Join room</ui-button
            >
          </div>
          <div v-if="rooms.length != 0">
            <div
              v-for="room in rooms"
              :key="room.uid"
              class="flex flex-col gap-2 p-3"
            >
              <Room :room="room" />
            </div>
          </div>
        </ui-drawer-content>
      </ui-drawer>
      <!-- App content -->
      <div class="demo-app-content w-full h-full p-2">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RealtimeSubscription } from "@supabase/realtime-js";
import { Vue, Options } from "vue-class-component";
import Room from "../components/Room.vue";
import UserInfoDialog from "../components/UserInfoDialog.vue";
import { RoomModel } from "../types/room.model";
import JoinRoomDialog from "../components/JoinRoomDialog.vue";

@Options({
  components: { Room, UserInfoDialog, JoinRoomDialog },
})
export default class MainView extends Vue {
  openUserDialog = false;
  isLoading = false;
  rooms: Array<RoomModel> = [];
  subscribe: RealtimeSubscription | null = null;
  onChange(change: Array<RoomModel>) {
    this.rooms = change;
  }
  async created() {
    this.subscribe = await this.$sbs.observeRooms(this.onChange);
  }
  unmounted() {
    console.debug("Unsubcribe");
    this.subscribe?.unsubscribe();
  }
  singOut() {
    this.$sbs.singOut();
  }
  joinRoom(secret: { code: string; secret: string }) {
    console.log(secret);
  }
}
</script>
