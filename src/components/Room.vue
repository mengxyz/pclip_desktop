<template>
  <div>
    <router-link
      :to="{ name: 'room', params: room }"
      custom
      v-slot="{ navigate, isActive }"
    >
      <v-list-item two-line @click="navigate" :class="{ active: isActive }">
        <v-list-item-header>
          <v-list-item-title>{{ room.name }}</v-list-item-title>
          <v-list-item-subtitle>????????</v-list-item-subtitle>
        </v-list-item-header>
      </v-list-item>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Vue, prop } from "vue-class-component";
import { RoomModel } from "../types/room.model";

class Props {
  room = prop<RoomModel>({ required: true });
}

export default class Room extends Vue.with(Props) {
  room_route = `/room/${this.room.id}`;
  click() {
    // this.$router.push();
  }
}
</script>
<style lang="scss" scoped>
@use "@material/theme" as color;
.room {
  &.active {
    // border-left: solid 3px color.$primary !important;
    background-color: #f0f2f5;
  }
}
</style>
