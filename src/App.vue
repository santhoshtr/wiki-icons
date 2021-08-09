<template>
  <main>
    <header class="controls">
      <div class="control">
        <label for="dir">Script direction </label>
        <select id="dir" v-model="dir">
          <option value="ltr">Left to Right</option>
          <option value="rtl">Right to Left</option>
        </select>
      </div>
      <div class="control">
        <label for="color">Color</label>
        <input type="color" v-model="color" />
      </div>
      <div class="control">
        <label for="size">Size</label>
        <input type="range" min="20" max="100" v-model="size" />
      </div>
    </header>
    <table class="icons">
      <tr v-for="(icon, name) in icons" :key="name">
        <td class="icon-name">{{ name }}</td>
        <td :dir="dir">
          <Icon :icon="icon" :iconColor="color" :size="size" />
        </td>
      </tr>
    </table>
  </main>
</template>

<script>
import Icon from "./components/Icon.vue";
import icons from "../icons";
import { ref } from "vue";

export default {
  components: {
    Icon,
  },
  setup(props, context) {
    const dir = ref("ltr");
    const color = ref("#000");
    const size = ref(20);
    return {
      icons,
      dir,
      size,
      color,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  margin: auto;
  width: 80%;
}

label {
  margin-right: 2em;
}

table {
  margin: 2em 0;
}

.controls {
  position: sticky;
  top: 0;
  background-color: white;
  padding: 1em;
  z-index: 10;
}
</style>
