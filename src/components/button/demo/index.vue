<template>
  <base-view>
    <NavBar
      slot="header"
      :title="'Button'"
      type="white"
      left-arrow
      @click-left="goBack"
    />
    <card :title="'按钮类型'">
      <div class="button-wrapper">
        <xzy-button
          v-for="{ text, type } in buttonList1"
          :key="type"
          :text="text"
          :type="type"
        />
      </div>
    </card>
    <card :title="'按钮形状'">
      <div class="button-wrapper">
        <xzy-button
          v-for="({ text, type, round }, index) in buttonList2"
          :key="index"
          :text="text"
          :type="type"
          :round="round"
        />
      </div>
    </card>
    <card :title="'按钮大小'">
      <div class="button-wrapper">
        <xzy-button
          v-for="({ text, type, size }, index) in buttonList3"
          :key="index"
          :text="text"
          :type="type"
          :size="size"
        />
      </div>
    </card>
    <card :title="'禁用按钮'">
      <div class="button-wrapper">
        <xzy-button
          v-for="({ text, type }, index) in buttonList1"
          :key="index"
          :text="text"
          :type="type"
          disabled
        />
      </div>
    </card>
    <card :title="'块级元素'">
      <div class="button-wrapper">
        <xzy-button
          v-for="({ text, type }, index) in buttonList1"
          :key="index"
          :text="text"
          :type="type"
          block
        />
      </div>
    </card>
    <card :title="'图标'">
      <div class="button-wrapper">
        <xzy-button
          v-for="({ text, type, icon, iconPosition }, index) in buttonList4"
          :key="index"
          :text="text"
          :type="type"
          :icon="icon"
          :icon-position="iconPosition"
        />
      </div>
    </card>
  </base-view>
</template>
<script>
import NavBar from "../../nav-bar";
import Button from "../index.vue";
import { BUTTON_TYPE } from "../enums";
export default {
  name: "NavBarDemo",
  components: { "xzy-button": Button, NavBar },
  data() {
    return {
      buttonList1: [
        {
          type: BUTTON_TYPE.DEFAULT,
          text: "默认按钮",
        },
        {
          type: BUTTON_TYPE.PRIMARY,
          text: "主要按钮",
        },
        {
          type: BUTTON_TYPE.INFO,
          text: "信息按钮",
        },
        {
          type: BUTTON_TYPE.TEXT,
          text: "文本按钮",
        },
        {
          type: BUTTON_TYPE.LINK,
          text: "链接按钮",
        },
      ],
      buttonList2: [
        {
          type: BUTTON_TYPE.PRIMARY,
          text: "矩形按钮",
          round: false,
        },
        {
          type: BUTTON_TYPE.PRIMARY,
          text: "圆角按钮",
          round: true,
        },
      ],
      buttonList3: [
        {
          type: BUTTON_TYPE.PRIMARY,
          text: "大号按钮",
          size: "large",
        },
        {
          type: BUTTON_TYPE.PRIMARY,
          text: "普通按钮",
          size: "normal",
        },
        {
          type: BUTTON_TYPE.PRIMARY,
          text: "小型按钮",
          size: "small",
        },
      ],
      buttonList4: [
        {
          type: BUTTON_TYPE.PRIMARY,
          text: "按钮图标-左边",
          icon: "exchange_face",
          iconPosition: "left",
        },
        {
          type: BUTTON_TYPE.PRIMARY,
          text: "按钮图标 - 右边",
          icon: "exchange_face",
          iconPosition: "right",
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
    align-content: ce;
  }
}
</style>
