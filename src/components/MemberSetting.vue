<script lang="ts" setup>
import { RealtimeSubscription } from "@supabase/supabase-js";
import { ref, defineExpose } from "vue";
import { RoomService } from "../services/room.service";
import { MemberModel } from "../types/member.model";
import MemberCard from "./MemberCard.vue";
interface Props {
  id: string;
}
const props = defineProps<Props>();
const roomService: RoomService = new RoomService(props.id);
const members = ref<Array<MemberModel>>([]);
let subscribe: RealtimeSubscription | undefined;
function onChange(change: Array<MemberModel>) {
  console.log("Change", change);
  members.value = change;
}
const dispose = () => {
  subscribe?.unsubscribe();
  console.log("Member setting Unmounted");
};
const init = async () => {
  subscribe = await roomService.observeMembers(onChange);
};

defineExpose({ init, dispose });
</script>

<template>
  <div class="tw-h-full tw-p-2">
    <MemberCard
      v-for="member in members"
      :key="member.member_id"
      :member="member"
    />
  </div>
</template>
