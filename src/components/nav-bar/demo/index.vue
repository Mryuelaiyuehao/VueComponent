<template>
  <base-view>
    <NavBar
      slot="header"
      :title="$t('common.navTitle')"
      type="white"
      left-arrow
      @click-left="goBack"
    />
    <card :title="$t('common.navbarDemo1')">
      <NavBar
        :title="$t('common.navbarTitle1')"
        :left-text="$t('common.navbarLeftText1')"
        :right-text="$t('common.navbarRightText1')"
        left-arrow
      />
    </card>
    <card :title="$t('common.navbarDemo2')">
      <NavBar>
        <div slot="title">{{ $t("common.navbarTitle2") }}</div>
        <Icon slot="left" name="close_line" :size="42" color="primary" />
        <Icon slot="right" name="search_line" :size="42" color="primary" />
      </NavBar>
    </card>
    <card :title="$t('common.navbarDemo3')">
      <NavBar
        :title="$t('common.navbarTitle1')"
        :left-text="$t('common.navbarLeftText1')"
        :right-text="$t('common.navbarRightText1')"
        left-arrow
        type="primary"
      />
    </card>
    <card :title="$t('common.navbarDemo4')">
      <NavBar
        :title="$t('common.navbarTitle1')"
        :left-text="$t('common.navbarLeftText1')"
        :right-text="$t('common.navbarRightText1')"
        left-arrow
        type="white"
      />
    </card>
  </base-view>
</template>
<script>
import NavBar from "../index.vue";
import Icon from "../../icon/index.vue";
export default {
  name: "NavBarDemo",
  components: { NavBar, Icon },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
.left-custom {
  display: flex;
  align-items: center;
}
</style>
