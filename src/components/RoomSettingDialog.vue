<template>
  <v-dialog
    :model-value="dialog"
    scrollable
    content-class="v-dialog-room-setting"
    height="450"
  >
    <v-card>
      <v-card-title>Select Country</v-card-title>
      <v-divider></v-divider>
      <v-card-text
        style="height: 400px"
        class="tw-text-black tw-flex tw-flex-col"
      >
        <div class="text-body">Member</div>
        <div class="tw-flex tw-flex-col tw-overflow-y-auto tw-flex-grow">
          <v-list-item
            two-line
            v-for="member in members"
            :key="member.member_id"
            class="hover:tw-bg-gray-200"
          >
            <v-list-item-header>
              <v-list-item-title>{{ member.device_name }}</v-list-item-title>
              <v-list-item-subtitle>{{
                member.member_id
              }}</v-list-item-subtitle>
            </v-list-item-header>
          </v-list-item>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-progress-linear
        v-if="isLoading"
        indeterminate
        color="primary"
      ></v-progress-linear>
      <v-card-actions class="tw-justify-end">
        <v-btn
          :disabled="isLoading"
          :color="isLoading || 'primary'"
          @click="$emit('update:dialog', false)"
        >
          Close
        </v-btn>
        <v-btn
          :color="isLoading || 'error'"
          :disabled="isLoading"
          @click="leaveRoom()"
        >
          Leave
        </v-btn>
        <v-btn
          :color="isLoading || 'primary'"
          :disabled="isLoading"
          @click="onConfirm()"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { RealtimeSubscription } from "@supabase/supabase-js";
import { Vue, Options, prop } from "vue-class-component";
import { MemberModel } from "../types/member.model";
import { RoomModel } from "../types/room.model";
import MemberCard from "./MemberCard.vue";
import { RoomService } from "../services/room.service";
import { Events } from "../types/events";
import randomatic from "randomatic";
class Props {
  dialog = prop<Boolean>({ default: false });
  id = prop<string>({ required: true });
}

@Options({
  components: { MemberCard },
})
export default class JoinRoomDialog extends Vue.with(Props) {
  isLoading = false;
  roomName = "";
  roomSecret = "";
  room?: RoomModel;
  subscribe: RealtimeSubscription | null = null;
  members: Array<MemberModel> = [];
  roomService: RoomService = new RoomService(this.id);
  randomSecret() {
    this.roomSecret = randomatic(32);
  }
  async onConfirm() {
    this.isLoading = true;
    this.roomService.saveSecret(this.roomSecret);
    this.isLoading = false;
    this.$emit("update:dialog", false);
  }
  async leaveRoom() {
    this.isLoading = true;
    const success = await this.roomService.leaveRoom();
    this.isLoading = false;
    if (success) {
      this.$eventbus.emit(Events.REFRESH_ROOMS, true);
      this.$router.replace("/");
    }
  }
  async mounted() {
    this.room = await this.roomService.getRoom();
    this.roomSecret = localStorage.getItem(this.id) ?? "";
    console.log(this.room);
    this.roomName = this.room.name;
    console.debug("Dialog Mounted", this.id);
    this.subscribe = await this.$sbs.observeMembers(
      this.room.id!,
      (n) => (this.members = n)
    );
  }
  unmounted() {
    this.subscribe?.unsubscribe();
    console.debug("Dialog unmounted", this.room?.id);
  }
}
</script>
<style lang="scss">
.v-dialog-room-setting {
  width: 500px !important;
  max-width: 500px !important;
}
</style>
