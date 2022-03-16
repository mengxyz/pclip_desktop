<template>
  <div>
    <router-link :to="room_route" custom v-slot="{ navigate, isActive }">
      <!-- <NavLink :active="isActive" :href="href" @click="navigate">
        {{ route.fullPath }}
      </NavLink> -->
      <ui-card
        class="room"
        :class="{ active: isActive }"
        v-ripple
        v-shadow="2"
        @click="navigate"
      >
        <ui-card-content>
          <div class="p-3">
            <h1 :class="$tt('headline6')">{{ room.name }}</h1>
            <h1 :class="$tt('subtitle1')">{{ room.uid }}</h1>
          </div>
        </ui-card-content>
      </ui-card>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Vue, prop } from "vue-class-component";
import * as uuid from "uuid";
import { RoomModel } from "../types/room.model";

class Props {
  room = prop<RoomModel>({ required: true });
}

export default class Room extends Vue.with(Props) {
  room_id = uuid.v4();
  room_route = `/room/${this.room_id}`;
  click() {
    // this.$router.push();
  }
}
</script>
<style lang="scss" scoped>
.room {
  &.active {
    background-color: grey;
  }
}
</style>
