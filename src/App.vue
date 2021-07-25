<template>
  <div id="app">
    <scroll-tab
      :tabList="tabList"
      :start-index="3"
      :wrap-style="{ width: '28%', paddingRight: '10px' }">
      <template #default="slotProps">
        <div class="tab-item"
          :class="{'tab-item-choose': slotProps.index === slotProps.activiteIndex}">
          {{ slotProps.item }}
        </div>
      </template>
    </scroll-tab>
  </div>
</template>

<script>
import ScrollTab from "./components/ScrollTab.vue";
export default {
  name: "App",
  data() {
    return {
      tabList: [
        "星星点点",
        "一表人才",
        "万里长城",
        "省得惹我",
        "热火朝天",
        "千军万马",
        "万水千山",
        "众多非一"
      ],
    };
  },
  components: {
    ScrollTab,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  padding: 0 0px;
}
.tab-item {
  text-align: center;
  border: 1px solid skyblue;
  border-radius: 6px;
  font-size: 14px;
}

.tab-item-choose {
  background-color: yellowgreen;
  color: #fff;
}
</style>
