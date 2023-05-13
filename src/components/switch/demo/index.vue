<template>
  <base-view>
    <NavBar
      slot="header"
      :title="$t('common.switchTitle')"
      type="white"
      left-arrow
      @click-left="goBack"
    />
    <card :title="$t('common.switchDemo1')">
      <xzy-switch v-model="checked" />
    </card>
    <card :title="$t('common.switchDemo2')">
      <xzy-switch v-model="checked" disabled />
    </card>
    <card :title="$t('common.switchDemo3')">
      <div class="switch-wrapper">
        <xzy-switch
          v-for="size in switchList()"
          :key="size"
          v-model="checked"
          :size="size"
        />
      </div>
    </card>
    <card :title="$t('common.switchDemo4')">
      <xzy-switch
        v-model="checked"
        active-color="warning"
        inactive-color="danger"
      />
    </card>
  </base-view>
</template>
<script>
import Switch from "../index.vue";
import NavBar from "../../nav-bar";
import { SWITCH_SIZE } from "../enums";
export default {
  name: "SwitchDemo",
  components: { "xzy-switch": Switch, NavBar },
  props: {},
  data() {
    return {
      checked: true,
      switchList: () => [
        SWITCH_SIZE.SMALL,
        SWITCH_SIZE.NORMAL,
        SWITCH_SIZE.LARGE,
      ],
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
.switch-wrapper {
  display: flex;
  gap: $space4;
  align-items: center;
}
</style>
