<template>
  <div id="scrollTab" ref="tab" 
    @touchstar.prevent="startFn"
    @touchmove.prevent="moveFn"
    :style="{transform:`translateX(${tranX}px)`}"
    >
    <div class="tab-item-wrap" 
      ref="tabItemWrap"
      v-for="(tItem, index) in tabList"
      :key="index"
      @click="onClick(index)"
      :style="{ width: `${wrapWidth}%`, paddingRight: `${wrapPaddingRight}px` }">
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
      startX:0,
      diffX:0,
      preX:0,
      tranX:0
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
    this.$refs.tab.scrollLeft = this.calcTransX(this.activiteIndex);
    window.addEventListener("resize", this.resetInit);
  },
  beforeDestroy(){
    window.removeEventListener("resize", this.resetInit);
  },
  methods: {
    resetInit(){
      this.$nextTick(this.init)
    },
    // 初始化
    init() {
      this.tabWidth = this.$refs.tab.getBoundingClientRect().width;
      this.tabItemWrapWidth =
        this.$refs.tabItemWrap[0].getBoundingClientRect().width;
      this.maxScrollX =
        this.tabItemWrapWidth * this.tabList.length - this.tabWidth;
    },
    // 滑动开始
    startFn(e){
      this.startX =  this.preX = this.getTransX(e);
    },
    getTransX(e) {
      return e.touches[e.touches.length - 1].clientX;
    },
    onClick(i) {
      this.activiteIndex = i;
      // 本次滚动位置
      this.endScrollX = this.calcTransX(i);
      // 修正滚动目的位置
      if (this.endScrollX < 0) {
        this.endScrollX = 0;
      } else if (this.endScrollX > this.maxScrollX) {
        this.endScrollX = this.maxScrollX;
      }
      // 点击事件发送
      this.$emit("click", this.activiteIndex);
    },
    // 触控 - move
    moveFn(e) {
      this.diffX = this.getTransX(e) - this.startX;
      this.tranX = this.preX+this.diffX
    },
    // 计算点击tabItem滚动到中间的位置
    calcTransX(i) {
      return (
        this.$refs.tabItemWrap[i].offsetLeft +
        this.tabItemWrapWidth / 2 -
        this.tabWidth / 2 -
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
  // overflow-x: scroll;
  overflow: hidden;
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