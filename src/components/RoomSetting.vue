<template>
  <confirm-dialog v-model="confirmDialog" @confirm="leaveRoom()">
    You want to leave this room ?.
  </confirm-dialog>
  <div class="tw-h-full tw-p-2 tw-flex tw-flex-col tw-justify-between">
    <v-form ref="form" :disabled="isLoading">
      <v-text-field
        color="primary"
        hide-details
        label="Room Name"
        v-model="roomName"
        :disabled="!isOwner()"
      >
      </v-text-field>
      <v-text-field
        append-inner-icon="mdi-refresh"
        @click:append-inner="randomSecret()"
        hide-details
        v-model="roomSecret"
        label="Room Secrets"
        class="tw-mt-2 tw-mb-2"
        color="primary"
      >
      </v-text-field>
    </v-form>
    <div class="tw-flex tw-flex-row tw-gap-2">
      <v-btn
        :disabled="isLoading"
        @click="saveChange()"
        class="tw-bg-green-400 tw-flex-grow"
        >Save</v-btn
      >
      <v-btn
        :disabled="isLoading"
        class="tw-bg-red-400"
        @click="confirmDialog = true"
        >Leave</v-btn
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RoomModel } from "../types/room.model";
import { RoomService } from "../services/room.service";
import { Events } from "../types/events";
import randomatic from "randomatic";
import { ref, defineExpose, onMounted } from "vue";
import useEventBus from "../composables/useEventBus";
import { useRouter } from "vue-router";
import ConfirmDialog from "./ConfirmDialog.vue";
import useSupabaseService from "../composables/useSupabaseService";
interface Props {
  id: string;
}
const props = defineProps<Props>();
const { sbs } = useSupabaseService();
const isLoading = ref(false);
const roomName = ref("");
const roomSecret = ref("");
const room = ref<RoomModel | undefined>(undefined);
const roomService: RoomService = new RoomService(props.id);
const confirmDialog = ref(false);
const { emit } = useEventBus();
const router = useRouter();
const form = ref<HTMLFormElement | null>(null);
const isOwner = () => room.value?.owner === sbs.user()?.id;

async function leaveRoom() {
  isLoading.value = true;
  const success = await roomService.leaveRoom();
  isLoading.value = false;
  if (success) {
    router.replace("/");
    emit(Events.REFRESH_ROOMS, true);
  }
}
function randomSecret() {
  roomSecret.value = randomatic(32);
}
async function saveChange() {
  isLoading.value = true;
  roomService.saveSecret(roomSecret.value);
  isLoading.value = false;
}
const init = async () => {
  room.value = await roomService.getRoom();
  roomSecret.value = localStorage.getItem(props.id) ?? "";
  roomName.value = room.value.name;
};
onMounted(init);
defineExpose({ init });
</script>
