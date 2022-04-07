<script lang="ts" setup>
import { RoomModel } from "../types/room.model";

interface Props {
  room: RoomModel;
}

defineProps<Props>();
</script>

<template>
  <div>
    <router-link
      :to="{ name: 'room', params: room }"
      custom
      v-slot="{ navigate, isActive }"
    >
      <v-list-item
        two-line
        @click="navigate"
        :class="{ active: isActive }"
        class="room"
      >
        <v-list-item-header>
          <v-list-item-title>{{ room.name }}</v-list-item-title>
          <v-list-item-subtitle>????????</v-list-item-subtitle>
        </v-list-item-header>
      </v-list-item>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.room {
  &.active {
    &.v-theme--light {
      @apply tw-bg-light-900;
    }
    &.v-theme--dark {
      @apply tw-bg-dark-200;
    }
  }
}
</style>
