<template>
  <span class="mw-icon notranslate" :class="classes">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="size"
      :height="size"
      viewBox="0 0 20 20"
      :aria-labelledby="iconName"
      aria-hidden="true"
      role="presentation"
      @click="handleClick"
    >
      <title v-if="iconName" :id="iconName">{{ iconName }}</title>
      <g :fill="iconColor">
        <path :d="iconImagePath" />
      </g>
    </svg>
  </span>
</template>

<script>
export default {
  name: "MWIcon",
  props: {
    /**
     * Icon - An svg path or an object with path and flippable properties.
     **/
    icon: {
      type: [String, Object],
      default: null
    },
    iconName: {
      type: String,
      default: null
    },
    /**
     * Icon color
     **/
    iconColor: {
      type: String,
      default: "currentColor"
    },
    /**
     * Icon size
     **/
    size: {
      type: [Number, String],
      default: 20
    }
  },
  computed: {
    classes: vm => ({
      "mw-icon--noflip": !vm.flip
    }),
    iconImagePath: vm => vm.icon?.path || vm.icon,
    /**
     * Whether the icon should be flipped on RTL(Default: true)
     */
    flip: vm => vm.icon?.flippable !== false
  },
  methods: {
    handleClick(e) {
      this.$emit("click", e);
    }
  }
};
</script>

<style>
span.mw-icon {
  text-indent: 0;
  vertical-align: middle;
  user-select: none;
  min-height: unset;
  min-width: unset;
}

[dir="rtl"] .mw-icon:not(.mw-icon--noflip) svg {
  transform: scaleX(-1);
}
</style>
