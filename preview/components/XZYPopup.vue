<template>
  <Popup
    :value="value"
    position="bottom"
    :custom-style="customStyle"
    round
    @input="hidePopup"
  >
    <base-view>
      <template slot="header">
        <NavBar v-if="single" :title="title" @click-right="hidePopup">
          <Icon slot="right" name="close_line" :size="42" />
        </NavBar>
        <NavBar
          v-else
          :title="title"
          :left-text="$t('common.cancel')"
          :right-text="$t('common.confirm')"
          @click-left="onCancel"
          @click-right="onConfirm"
        >
        </NavBar>
      </template>
      <slot></slot>
    </base-view>
  </Popup>
</template>
<script>
import { NavBar, Popup, Icon } from "@/index.js";
export default {
  name: "XZYPopup",
  components: { NavBar, Popup, Icon },
  props: {
    value: {
      type: Boolean,
      default: () => false,
    },
    title: {
      type: String,
      default: () => "",
    },
    single: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {
      customStyle: {
        width: "100%",
        height: "50%",
      },
    };
  },
  methods: {
    hidePopup() {
      this.$emit("input", false);
    },
    onConfirm() {
      this.$emit("confirm");
      this.hidePopup();
    },
    onCancel() {
      this.$emit("cancel");
      this.hidePopup();
    },
  },
};
</script>
