<template>
  <base-view>
    <NavBar
      slot="header"
      :title="'Cell 单元格'"
      type="white"
      left-arrow
      @click-left="goBack"
    />
    <card :title="'基础用法'">
      <CellGroup>
        <Cell
          v-for="({ title, value, label }, index) in cellList1"
          :key="index"
          :title="title"
          :value="value"
          :label="label"
        />
      </CellGroup>
    </card>
    <card :title="'是否垂直居中'">
      <CellGroup>
        <Cell
          v-for="({ title, value, label }, index) in cellList1"
          :key="index"
          :title="title"
          :value="value"
          :label="label"
          center
        />
      </CellGroup>
    </card>
    <card :title="'是否右箭头'">
      <CellGroup>
        <Cell
          v-for="({ title, value, label }, index) in cellList1"
          :key="index"
          :title="title"
          :value="value"
          :label="label"
          is-link
          center
        />
      </CellGroup>
    </card>
    <card :title="'是否开启点击反馈'">
      <CellGroup>
        <Cell
          v-for="({ title, value, label }, index) in cellList1"
          :key="index"
          :title="title"
          :value="value"
          :label="label"
          clickable
          center
        />
      </CellGroup>
    </card>
    <card :title="'是否必填'">
      <CellGroup>
        <Cell
          v-for="({ title, value, label }, index) in cellList1"
          :key="index"
          :title="title"
          :value="value"
          :label="label"
          center
          required
        />
      </CellGroup>
    </card>
  </base-view>
</template>
<script>
import NavBar from "../../nav-bar";
import Cell from "../index.vue";
import CellGroup from "../../cell-group/index.vue";
export default {
  name: "NavBarDemo",
  components: { Cell, CellGroup, NavBar },
  data() {
    return {
      cellList1: [
        {
          title: "单元格1",
          value: "内容1",
          label: "描述信息1",
        },
        {
          title: "单元格2",
          value: "内容2",
          label: "描述信息2",
        },
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
.button-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 30px;
  > button {
    align-content: ce;
  }
}
</style>
