<template>
  <base-view>
    <NavBar
      slot="header"
      :title="$t('common.cellTitle')"
      type="white"
      left-arrow
      @click-left="goBack"
    />
    <card :title="$t('common.cellDemo1')">
      <CellGroup>
        <Cell
          v-for="({ title, value, label }, index) in cellList1()"
          :key="index"
          :title="title"
          :value="value"
          :label="label"
        />
      </CellGroup>
    </card>
    <card :title="$t('common.cellDemo2')">
      <CellGroup>
        <Cell
          v-for="({ title, value, label }, index) in cellList1()"
          :key="index"
          :title="title"
          :value="value"
          :label="label"
          center
        />
      </CellGroup>
    </card>
    <card :title="$t('common.cellDemo3')">
      <CellGroup>
        <Cell
          v-for="({ title, value, label }, index) in cellList1()"
          :key="index"
          :title="title"
          :value="value"
          :label="label"
          is-link
          center
        />
      </CellGroup>
    </card>
    <card :title="$t('common.cellDemo4')">
      <CellGroup>
        <Cell
          v-for="({ title, value, label }, index) in cellList1()"
          :key="index"
          :title="title"
          :value="value"
          :label="label"
          clickable
          center
        />
      </CellGroup>
    </card>
    <card :title="$t('common.cellDemo5')">
      <CellGroup>
        <Cell
          v-for="({ title, value, label }, index) in cellList1()"
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
      cellList1: () => [
        {
          title: this.$t("common.cellDemoTitle1"),
          value: this.$t("common.cellDemoValue1"),
          label: this.$t("common.cellDemoLabel1"),
        },
        {
          title: this.$t("common.cellDemoTitle2"),
          value: this.$t("common.cellDemoValue2"),
          label: this.$t("common.cellDemoLabel2"),
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
  gap: 30px;
  align-items: center;

  > button {
    align-content: center;
  }
}
</style>
