<template>
  <div id="scrollTab" ref="tab" @touchmove="touchMoveFn">
    <div
      class="tab-item-wrap"
      ref="tabItemWrap"
      v-for="(tItem, index) in tabList"
      :key="index"
      @click="handleTab(index)"
      :style="{ width: `${wrapWidth}%`, paddingRight: `${wrapPaddingRight}px` }"
    >
      <slot :item="tItem" :index="index" :activite-index="activiteIndex"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScrollTab",
  props: {
    tabList: {
      type: Array,
      default: () => [],
    },
    // 起始tab索引
    startIndex: {
      type: Number,
      default: () => 0,
    },
    // 动画持续时间  ms
    duration: {
      type: Number,
      default: () => 400,
    },
    // 单个tabItem的宽度 %
    wrapWidth: {
      type: Number,
      default: () => 25,
    },
    // 相邻tabItem的间距 px
    wrapPaddingRight: {
      type: Number,
      default: () => 10,
    },
  },
  data() {
    return {
      activiteIndex: 0, // 激活的tabItem索引值
      tabWidth: 0, // scrollTab宽度 - 精准值
      tabItemWrapWidth: 0, //tabWrapItem宽度 - 精准值
      endScrollX: 0, // 滚动距离
      maxScrollX: 0, // 最大滚动距离
      tabAnimation: false, // 动画是否开启
    };
  },
  created() {
    this.activiteIndex = this.startIndex;
    // 点击事件发送
    this.$emit("click", this.activiteIndex);
  },
  mounted() {
    this.init();
    // 根据startIndex值初始化位置
    this.$refs.tab.scrollLeft = this.getScrollLeft(this.activiteIndex);
    window.addEventListener("resize", this.init);
  },
  methods: {
    init() {
      this.tabWidth = this.$refs.tab.getBoundingClientRect().width;
      this.tabItemWrapWidth =
        this.$refs.tabItemWrap[0].getBoundingClientRect().width;
      this.maxScrollX =
        this.tabItemWrapWidth * this.tabList.length - this.tabWidth;
    },
    handleTab(i) {
      this.activiteIndex = i;
      // 本次滚动位置
      this.endScrollX = this.getScrollLeft(i);
      // 修正滚动目的位置
      if (this.endScrollX < 0) {
        this.endScrollX = 0;
      } else if (this.endScrollX > this.maxScrollX) {
        this.endScrollX = this.maxScrollX;
      }
      // 缓动
      this.$anime({
        targets: this.$refs.tab,
        scrollLeft: this.endScrollX,
        easing: "easeOutQuad",
        duration: this.duration,
        begin: () => {
          this.tabAnimation = true;
        },
        complete: () => {
          this.tabAnimation = false;
        },
      });
      // 点击事件发送
      this.$emit("click", this.activiteIndex);
    },
    // 触控 - move
    touchMoveFn(e) {
      this.tabAnimation && e.preventDefault();
    },
    // 计算点击tabItem滚动到中间的位置
    getScrollLeft(i) {
      return (
        this.$refs.tabItemWrap[i].offsetLeft -
        this.tabWidth / 2 +
        this.tabItemWrapWidth / 2 -
        this.$refs.tab.offsetLeft -
        this.wrapPaddingRight / 2
      );
    },
  },
};
</script>

<style scoped lang="scss">
#scrollTab {
  display: flex;
  /* 兼容fireFox */
  scrollbar-width: none;
  /* 兼容ie10+ */
  -ms-overflow-style: none;
  overflow-x: scroll;
  .tab-item-wrap {
    // 修复移动端点击该元素出现黑色闪动
    -webkit-tap-highlight-color: transparent;
    flex: none;
  }

  /* 兼容safari和chrome */
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>