<template>
  <p>{{ id }}</p>
  <div class="flex flex-col gap-3" :class="$tt('body2')">
    <div v-ripple class="self-end message owner">Message</div>
    <p class="self-start message">Message2</p>
    <div v-ripple class="self-start message">
      Contrary to popular belief, Lorem Ipsum is not simply random text. It has
      roots in a piece of classical Latin literature from 45 BC, making it over
      2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
      College in Virginia, looked up one of the more obscure Latin words,
      consectetur, from a Lorem Ipsum passage, and going through the cites of
      the word in classical literature, discovered the undoubtable source. Lorem
      Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
      Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This
      book is a treatise on the theory of ethics, very popular during the
      Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
      amet..", comes from a line in section 1.10.32. The standard chunk of Lorem
      Ipsum used since the 1500s is reproduced below for those interested.
      Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by
      Cicero are also reproduced in their exact original form, accompanied by
      English versions from the 1914 translation by H. Rackham.
    </div>
    <p class="self-start message owner">
      "But I must explain to you how all this mistaken idea of denouncing
      pleasure and praising pain was born and I will give you a complete account
      of the system, and expound the actual teachings of the great explorer of
      the truth, the master-builder of human happiness. No one rejects,
      dislikes, or avoids pleasure itself, because it is pleasure, but because
      those who do not know how to pursue pleasure rationally encounter
      consequences that are extremely painful. Nor again is there anyone who
      loves or pursues or desires to obtain pain of itself, because it is pain,
      but because occasionally circumstances occur in which toil and pain can
      procure him some great pleasure. To take a trivial example, which of us
      ever undertakes laborious physical exercise, except to obtain some
      advantage from it? But who has any right to find fault with a man who
      chooses to enjoy a pleasure that has no annoying consequences, or one who
      avoids a pain that produces no resultant pleasure?"
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, prop } from "vue-class-component";
class Props {
  id = prop({
    type: String,
    required: true,
  });
}
export default class RoomVue extends Vue.with(Props) {
  created() {
    console.log("Create", this.id);
  }
  mounted() {
    console.log("Mount", this.id);
    document.title = "Room " + this.id;
  }
  updated() {
    console.log("Update", this.id);
    document.title = "Room " + this.id;
  }
}
</script>
<style lang="scss" scoped>
@use "@material/theme" as color;
.message {
  background-color: #eee;
  padding: 0.5rem;
  border-radius: 8px;
  color: black;
  &.owner {
    background-color: color.$primary;
    color: white;
  }
}
</style>
