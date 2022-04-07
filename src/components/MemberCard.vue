<template>
  <v-list-item two-line class="tw-cursor-pointer member-item">
    <v-list-item-header>
      <v-list-item-title>{{ member.device_name }}</v-list-item-title>
      <v-list-item-subtitle>{{
        member.member_id.split("-")[0]
      }}</v-list-item-subtitle>
    </v-list-item-header>
  </v-list-item>
</template>

<script lang="ts">
import { Vue, prop } from "vue-class-component";
import { MemberModel } from "../types/member.model";
class Props {
  member = prop<MemberModel>({ required: true });
}
export default class MemberCard extends Vue.with(Props) {}
</script>
<style lang="scss" scoped>
.v-theme--dark {
  &.member-item:hover {
    @apply tw-bg-dark-50;
  }
}
</style>
