<template>
  <UpdaterDialog
    v-model:manifest="manifest"
    v-model:dialog="openUpdater"
    @install="install()"
  />
  <!--<ui-snackbar v-model="showError" message="Install update error"></ui-snackbar> -->
  <v-app :theme="appStore.theme">
    <v-main class="tw-h-screen">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import UpdaterDialog from "./components/UpdaterDialog.vue";
import {
  checkUpdate,
  installUpdate,
  UpdateManifest,
} from "@tauri-apps/api/updater";
import { relaunch } from "@tauri-apps/api/process";
import { useAppStore } from "./store/appStore";
import { storeToRefs } from "pinia";
@Options({
  components: { UpdaterDialog },
})
export default class App extends Vue {
  manifest: UpdateManifest | null = null;
  openUpdater = false;
  showError = false;
  appStore = useAppStore();
  async updaterCheck() {
    try {
      const { manifest } = await checkUpdate();
      console.log(manifest);
      this.manifest = manifest ?? null;
      this.openUpdater = true;
    } catch (error) {
      console.error(error);
    }
  }
  async install() {
    try {
      await installUpdate();
      await relaunch();
    } catch (error) {
      console.error(error);
      this.showError = !this.showError;
    }
  }
  beforeMount() {
    this.updaterCheck();
  }
}
</script>
<style lang="scss">
body,
html {
  padding: 0;
  margin: 0;
  overflow: auto !important;
}

::-webkit-scrollbar {
  width: 12px;
}
::-webkit-scrollbar-track {
  background: transparent;
  border-left: none;
}
.v-theme--light {
  ::-webkit-scrollbar-thumb {
    background: #b0b0b0;
    border: solid 3px #e6e6e6;
    border-radius: 7px;
  }
}

.v-theme--dark {
  ::-webkit-scrollbar-thumb {
    background: #3e3e3e;
    border: solid 3px #202020;
    border-radius: 7px;
  }
}
</style>
