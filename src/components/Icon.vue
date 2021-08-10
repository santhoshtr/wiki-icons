<template>
  <span
    class="mw-icon notranslate"
    :class="classes"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="size"
      :height="size"
      viewBox="0 0 20 20"
      :aria-labelledby="iconName"
      aria-hidden="true"
      role="presentation"
    >
      <title v-if="iconName">{{ iconName }}</title>
      <g :fill="iconColor">
        <path :d="icon?.path || icon" />
      </g>
    </svg>
  </span>
</template>

<script>
import { computed } from "vue";
export default {
  name: "MWIcon",
  props: {
    /**
     * Icon - An svg path or an object with path and flippable properties.
     **/
    icon: {
      type: [String, Object],
      default: null,
    },
    iconName: {
      type: String,
      default: null,
    },
    /**
     * Icon color
     **/
    iconColor: {
      type: String,
      default: "currentColor",
    },
    /**
     * Icon size
     **/
    size: {
      type: [Number, String],
      default: 20,
    },
  },
  setup(props) {
    /**
     * Whether the icon should be flipped on RTL(Default: true)
     */
    const flip = computed(() => props.icon?.flippable === true);
    const classes = computed(() => ({ "mw-icon--noflip": !flip.value }));
    return {
      classes,
      flip,
    };
  }
};
</script>

<style>
span.mw-icon {
  align-items: center;
  display: inline-flex;
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
