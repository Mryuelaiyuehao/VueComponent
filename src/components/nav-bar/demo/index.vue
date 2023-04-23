<template>
  <base-view>
    <NavBar
      slot="header"
      :title="'NavBar'"
      type="white"
      left-arrow
      @click-left="goBack"
    />
    <card :title="'基础用法'">
      <NavBar
        :title="'标题'"
        :left-text="'返回'"
        :right-text="'按钮'"
        left-arrow
      />
    </card>
    <card :title="'使用插槽'">
      <NavBar>
        <div slot="title">插槽
</div>
        <Icon slot="left" name="close_line" :size="42" color="primary" />
        <Icon slot="right" name="search_line" :size="42" color="primary" />
      </NavBar>
    </card>
    <card :title="'primary'">
      <NavBar
        :title="'标题'"
        :left-text="'返回'"
        :right-text="'按钮'"
        left-arrow
        type="primary"
      />
    </card>
    <card :title="'white'">
      <NavBar
        :title="'标题'"
        :left-text="'返回'"
        left-arrow
        type="white"
        :right-text="'按钮'"
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
