<template>
  <div
    id="swipe"
    @mouseleave="leaveFn"
    @mousedown="startFn"
    @touchstart="startFn"
    @touchmove="moveFn"
    @mousemove="moveFn"
    @touchend="endFn"
    @mouseup="endFn"
  >
    <div
      class="swipe"
      ref="swipe"
      :style="{
        transform: `translate3d(${transX}px,0,0)`,
        transition: animateState ? `transform 350ms ease-out` : '',
      }"
      @transitionend="transEndFn"
    >
      <div
        class="swipe-item-wrapper"
        v-for="(sItem, index) in currentList"
        :key="index"
        :style="{ padding: `0 ${wrapperPadding}px` }"
      >
        <slot :sItem="sItem"></slot>
      </div>
    </div>
    <div
      v-if="showIndicators && swipeItemCount > 1"
      class="indicator"
      :class="`indicator-${indicatorPosition}`"
    >
      <div
        class="indicator-item"
        v-for="(iItem, index) in urlList"
        :key="index"
        :class="{ 'indicator-item-active': index === indicatorIndex }"
      ></div>
    </div>
  </div>
</template>

<script>
const Swipe = {
  MouseDown: "mousedown",
  MouseMove: "mousemove",
};
export default {
  name: "Swipe",
  props: {
    // 图片列表
    urlList: {
      type: Array,
      default: () => [],
    },
    // 起始索引
    startIndex: {
      type: Number,
      default: () => 0,
    },
    // 临界比，0-1之间小数
    cirticalVal: {
      type: Number,
      default: () => 1 / 5,
    },
    // 是否开启自动轮播
    autoplay: {
      tpye: Boolean,
      default: () => false,
    },
    // 自动轮播时间，ms
    autoPlayTime: {
      tpye: Number,
      default: () => 3000,
    },
    // 是否显示指示器
    showIndicators: {
      tpye: Boolean,
      default: () => false,
    },
    // 指示器位置，可选值为：'top-left' 'top-center' 'top-right' 'bottom-left' 'bottom-center' 'bottom-right'
    indicatorPosition: {
      type: String,
      default: () => "bottom-right",
    },
    // swipeItem包裹容器内边距,px
    wrapperPadding: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      currentList: [], // 处理后的urlList
      activeIndex: 0, // 处理后urlList的索引值
      indicatorIndex: 0, // 实际urlList的索引值
      swipeItemCount: 0, // 处理后urlList的长度
      transX: 0, // 滑动距离,px
      preX: 0, // 初始滑动距离,px
      startX: 0, // 起始滑动值,px
      diffX: 0, // 滚动距离差值,px
      minTransX: 0, // 最大滚动临界值,px
      animateState: false, // 开启动画
      transState: false, // 滑动状态
      swipeWidth: 0, // 单个swipeItem的宽度,px(精确值)
      timeId: null, // timeId
      isCritical: false, // 是否滑动到临界值
    };
  },
  computed: {
    // 是否可滑动 若轮播图数量<=1,则不可滑动
    isTrans() {
      return this.swipeItemCount > 1;
    },
  },
  created() {
    // 数据处理 url处理
    const urlListLen = this.urlList && this.urlList.length;
    const urlListTem = JSON.parse(JSON.stringify(this.urlList));
    // 如果轮播图数量大于1，则在首尾各追加一次
    if (urlListLen > 1) {
      this.currentList = urlListTem
        .slice(-1)
        .concat(urlListTem)
        .concat(urlListTem.slice(0, 1));
    } else if (urlListLen === 1) {
      this.currentList = urlListTem;
    }
    this.swipeItemCount = this.currentList.length;
    this.activeIndex = this.indicatorIndex = this.startIndex;
    this.activeIndex += 1;
    this.$emit("change", this.indicatorIndex); // 发送change事件
  },
  mounted() {
    // 当轮播图数量只有一张时候，只做展示
    if (!this.isTrans) return;
    this.init(); // 初始化
    this.autoplay && this.autoPlayFn(); // 自动轮播
    window.addEventListener("resize", this.init); // 监听页面大小发生变化，重新初始化参数
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.init);
    clearInterval(this.timeId);
  },
  methods: {
    // 初始化
    init() {
      this.swipeWidth = this.$refs.swipe.getBoundingClientRect().width; // 获取单个swipeItem的宽度
      this.minTransX = -(this.swipeItemCount - 1) * this.swipeWidth; // 滑动距离 - 最小
      this.transX = this.preX = this.calcTrans(); // 当前位置滑动距离
    },
    // 鼠标离开 - leave
    leaveFn() {
      this.endFn();
    },
    // 开始 - start
    startFn(e) {
      if (!this.isTrans) return;
      this.autoPlayFn && clearInterval(this.timeId);
      this.diffX = 0; // 滑动距离置0
      this.transState = true; // 滑动状态 - 开启
      this.startX = this.calcX(e, Swipe.MouseDown); // 点击或触控元素的位置
    },
    // 移动 -  move
    moveFn(e) {
      e.preventDefault();
      if (this.ingoreTrans()) return;
      // 非滑动状态
      if (!this.transState) return;
      // 临界值处理 - 滑动到一张
      if (this.transX >= 0) {
        this.isCritical = true;
        this.activeIndex = 0;
      } else if (this.transX <= this.minTransX) {
        this.isCritical = true;
        this.activeIndex = this.swipeItemCount - 1;
      } else {
        // 时时滑动
        this.isCritical = false;
        this.diffX = this.calcX(e, Swipe.MouseMove) - this.startX;
        this.transX = this.diffX + this.preX;
      }
    },
    // 计算距离
    calcX(e, eventType) {
      // 鼠标事件 PC端
      if (e.type === eventType) return e.clientX;
      // 触控事件 - 移动端
      return e.touches[e.touches.length - 1].clientX;
    },
    // 结束 - end
    endFn() {
      if (this.ingoreTrans()) return;
      this.transState = false; // 滑动状态 - 关闭
      const diffXAbs = Math.abs(this.diffX); // 滑动距离绝对值
      const swipeItemCount = Math.trunc(diffXAbs / this.swipeWidth); // 滑过轮播图个数
      const critialVal = diffXAbs / this.swipeWidth - swipeItemCount; // 滑动临界值比例
      // 左滑
      if (this.diffX > 0) {
        this.activeIndex -= swipeItemCount;
        if (critialVal >= this.cirticalVal) {
          this.activeIndex -= 1;
        }
        this.activeIndex = this.fixIndex(this.activeIndex);
      } else if (this.diffX < 0) {
        // 右滑
        this.activeIndex += swipeItemCount;
        if (critialVal >= this.cirticalVal) {
          this.activeIndex += 1;
        }
        this.activeIndex = this.fixIndex(this.activeIndex, false);
      }
      this.indicatorIndex = this.calcIndex(this.activeIndex) - 1; // 获取实际的索引值
      // 当手指滑动距离正好等于整数个SwipeItem时候
      if (critialVal === 0) {
        if (this.isCritical) {
          this.animateState = true; // 动画 - 开启
          this.transX = this.preX = this.calcTrans();
        } else {
          this.transEndFn();
        }
      } else {
        this.animateState = true; // 动画 - 开启
        this.transX = this.preX = this.calcTrans();
      }
    },
    // 修正索引值
    fixIndex(i, isLeft = true) {
      // 第一张轮播图
      if (isLeft) {
        return i < 0 ? 0 : i;
      } else {
        // 最后一张轮播图
        return i > this.swipeItemCount - 1 ? this.swipeItemCount - 1 : i;
      }
    },
    // 动画结束 - end
    transEndFn() {
      this.animateState = false; // 动画-关闭
      // 当滑动到最后或者第一张时候，瞬间拉回回当前轮播图实际位置
      this.activeIndex = this.calcIndex(this.activeIndex);
      this.transX = this.preX = this.calcTrans();
      this.$emit("change", this.indicatorIndex); // 发送change事件
      this.autoPlayFn && this.autoPlayFn(); // 自动播放-开启
    },
    // 计算滑动位置
    calcTrans() {
      return -this.activeIndex * this.swipeWidth;
    },
    // 计算索引位置
    calcIndex(i) {
      if (i === 0) {
        return this.swipeItemCount - 2;
      } else if (i === this.swipeItemCount - 1) {
        return 1;
      } else {
        return i;
      }
    },
    // 忽略滑动 - 当动画结束后或只有一张图片时候
    ingoreTrans() {
      return this.animateState || !this.isTrans;
    },
    // 自动轮播
    autoPlayFn() {
      clearInterval(this.timeId);
      this.timeId = setInterval(() => {
        this.activeIndex += 1;
        this.activeIndex = this.fixIndex(this.activeIndex, false);
        this.indicatorIndex = this.calcIndex(this.activeIndex) - 1;
        this.animateState = true;
        this.transX = this.preX = this.calcTrans();
      }, this.autoPlayTime);
    },
  },
};
</script>
<style lang="scss" scoped>
// 修复ios设备上滑动时候闪屏问题
@mixin ios-fix {
  -webkit-backface-visibility: hidden;
  -webkit-transform-style: preserve-3d;
}
#swipe {
  position: relative;
  width: 100%;
  font-size: 0;
  overflow: hidden;
  @include ios-fix;
  .swipe {
    white-space: nowrap;
    @include ios-fix;
    .swipe-item-wrapper {
      width: 100%;
      display: inline-block;
      box-sizing: border-box;
      @include ios-fix;
    }
  }
  .indicator {
    position: absolute;
    display: flex;

    // 指示器位置
    $indicator-position-list: (top-left, $px-8, auto, auto, $px-8, 0),
      (top-center, $px-8, auto, auto, 50%, -50%),
      (top-right, $px-8, $px-8, auto, auto, 0),
      (bottom-left, auto, auto, $px-8, $px-8, 0),
      (bottom-center, auto, auto, $px-8, 50%, -50%),
      (bottom-right, auto, $px-8, $px-8, auto, 0);

    @each $position, $top, $right, $bottom, $left,
      $trans-x in $indicator-position-list
    {
      &.indicator-#{$position} {
        top: $top;
        right: $right;
        bottom: $bottom;
        left: $left;
        transform: translate($trans-x, 0);
      }
    }
    .indicator-item {
      width: $px-8;
      height: $px-8;
      border-radius: 100%;
      background-color: $c-white;
      opacity: 0.6;
      margin-right: $px-4;

      &.indicator-item-active {
        opacity: 1;
      }
    }
  }
}
</style>