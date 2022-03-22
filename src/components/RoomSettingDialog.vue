<template>
  <ui-dialog
    :modelValue="dialog"
    :maskClosable="!isLoading"
    @update:modelValue="$emit('update:dialog', $event)"
    @close="onClose()"
  >
    <ui-dialog-title>Room Setting</ui-dialog-title>
    <ui-dialog-content>
      <div class="flex flex-col gap-4 items-center !w-[500px]">
        <ui-textfield minlength="6" v-model="roomName" class="w-full">
          Room Name
        </ui-textfield>
        <ui-textfield minlength="6" v-model="roomSecret" class="w-full">
          Room Secrets
        </ui-textfield>
        <div class="self-end">
          <ui-button
            :disabled="isLoading"
            @click="$emit('update:dialog', false)"
            >Close</ui-button
          >
          <ui-button :disabled="isLoading" @click="onConfirm()">
            Save
            <template #before v-if="isLoading">
              <ui-spinner class="mr-1" size="S" active></ui-spinner>
            </template>
          </ui-button>
        </div>
      </div>
    </ui-dialog-content>
    <!-- <ui-dialog-actions>

    </ui-dialog-actions> -->
  </ui-dialog>
</template>

<script lang="ts">
import { Vue, Options, prop } from "vue-class-component";
import { RoomModel } from "../types/room.model";
import Pin from "./Pin.vue";

class Props {
  dialog = prop<Boolean>({ default: false });
  id = prop<string>({ required: true });
}

@Options({
  components: { Pin },
})
export default class JoinRoomDialog extends Vue.with(Props) {
  isLoading = false;
  roomName = "";
  roomSecret = "";
  room?: RoomModel;
  onClose() {
    // this.roomName = "";
    // this.roomSecret = "";
  }
  async onConfirm() {
    this.isLoading = true;
    await new Promise((reslove) => setTimeout(reslove, 2000));
    this.isLoading = false;
    this.$emit("update:dialog", false);
  }
  async mounted() {
    this.room = await this.$sbs.getRoom(this.id);
    this.roomSecret = localStorage.getItem(this.id) ?? "";
    console.log(this.room);
    this.roomName = this.room.name;
    console.debug("Dialog Mounted", this.id);
  }
}
</script>
