<template>
  <div id="tab" ref="tab" @touchmove="touchMoveFn">
    <div
      class="tab-item-wrap"
      ref="tabItemWrap"
      v-for="(item, index) in tabList"
      :key="index"
      @click="handleTab(index)"
      :style="{ width: `${wrapWidth}%`, paddingRight: `${wrapPaddingRight}px` }"
    >
      <slot :item="item" :index="index" :activite-index="activiteIndex"></slot>
    </div>
  </div>
</template>

<script>
let tabWidth = 0; // tab宽度 - 精准值
let tabItemWrapWidth = 0; //tabWrapItem宽度 - 精准值
let endScrollX = 0; // 目的滚动值
let maxScrollX = 0; // 最大滚动值
let timerId = null; // timeId

export default {
  name: "ScrollTab",
  props: {
    tabList: {
      type: Array,
      default: () => [],
    },
    // 初始化显示的tabItem
    startIndex: {
      type: Number,
      default: () => 0,
    },
    // 滑动速率
    rate: {
      type: Number,
      default: () => 10,
    },
    // item的宽度 %
    wrapWidth: {
      type: Number,
      default: () => 25,
    },
    // item的间距 px
    wrapPaddingRight: {
      type: Number,
      default: () => 10,
    },
  },
  data() {
    return {
      activiteIndex: 0,
    };
  },
  created() {
    this.activiteIndex = this.startIndex;
  },
  mounted() {
    tabWidth = this.$refs.tab.getBoundingClientRect().width;
    tabItemWrapWidth = this.$refs.tabItemWrap[0].getBoundingClientRect().width;
    maxScrollX = tabItemWrapWidth * this.tabList.length - tabWidth;
    // 根据startIndex值初始化位置
    this.$refs.tab.scrollLeft = this.getScrollLeft(this.activiteIndex);
  },
  methods: {
    handleTab(i) {
      this.activiteIndex = i;
      // 本次滚动位置
      endScrollX = this.getScrollLeft(i);
      // 修正滚动目的位置
      if (endScrollX < 0) {
        endScrollX = 0;
      } else if (endScrollX > maxScrollX) {
        endScrollX = maxScrollX;
      }
      // 缓动
      timerId = requestAnimationFrame(this.animate);
      // 点击事件发送
      this.$emit("click", i);
    },
    touchMoveFn(){
      // 如果回滚过程中用户滑动，立刻取消回滚
      cancelAnimationFrame(timerId);
    },
    animate() {
      // 步长值
      const step = this.calcStep(this.$refs.tab.scrollLeft, endScrollX);
      this.$refs.tab.scrollLeft += step;
      if (step < 0) {
        if (this.$refs.tab.scrollLeft > endScrollX) {
          timerId = requestAnimationFrame(this.animate);
        } else {
          cancelAnimationFrame(timerId);
        }
      } else {
        if (this.$refs.tab.scrollLeft < endScrollX) {
          timerId = requestAnimationFrame(this.animate);
        } else {
          cancelAnimationFrame(timerId);
        }
      }
    },
    // 步长值计算
    calcStep(start, end) {
      let step = (end - start) / this.rate;
      // 右滑
      if (step < 0) {
        if (step > -1) step = -1;
      } else {
        // 左滑
        if (step < 1) step = 1;
      }
      return step;
    },
    // 滚动居中位置计算
    getScrollLeft(i) {
      return (
        this.$refs.tabItemWrap[i].offsetLeft -
        tabWidth / 2 +
        tabItemWrapWidth / 2 -
        this.$refs.tab.offsetLeft -
        this.wrapPaddingRight / 2
      );
    },
  },
};
</script>

<style scoped>
#tab {
  display: flex;
  /* 兼容fireFox */
  scrollbar-width: none;
  /* 兼容ie10+ */
  -ms-overflow-style: none;
  overflow-x: scroll;
}

.tab-item-wrap {
  flex: none;
}
/* 兼容safari和chrome */
#tab::-webkit-scrollbar {
  display: none;
}
</style>