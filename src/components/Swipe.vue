<template>
  <div
    id="swipe"
    @mouseenter="enterFn"
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
        transform: `translateX(${transX}px)`,
        transition: isTrans ? `transform .35s ease-out` : '',
      }"
      @transitionend="transEndFn"
    >
      <div
        class="swipe-item-wrapper"
        v-for="(uItem, index) in currentList"
        :key="index"
      >
        <slot name="swipeItem" :u-item="uItem"></slot>
      </div>
    </div>
    <div v-if="showIndicator" class="indicator">
      <div
        class="indicator-item-wrapper"
        v-for="(uItem, index) in urlList"
        :key="index"
      >
        <div
          class="indicator-item"
          :class="{ 'indicator-item-active': index === indicatorIndex }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
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
      default: () => 3,
    },
    // 临界比
    cirticalVal: {
      type: Number,
      default: () => 1 / 5,
    },
    // 是否开启自动播放
    autoplay: {
      tpye: Boolean,
      default: () => true,
    },
    // 自动播放时间，ms
    autoPlayTime: {
      tpye: Number,
      default: () => 2000,
    },
    showIndicator: {
      tpye: Boolean,
      default: () => true,
    },
  },
  data() {
    return {
      currentList: [], // 处理后的urlList
      activeIndex: 0, // 处理后urlList的索引值
      indicatorIndex: 0, // 实际urlList的索引值
      currentListLen: 0, // 处理后urlList的长度
      transX: 0, // 滑动距离,px
      preX: 0, // 初始滑动距离,px
      startX: 0, // 起始滑动值,px
      diffX: 0, // 滚动距离差值,px
      maxTransX: 0, // 最大滚动临界值,px
      isTrans: false, // 开启动画
      transState: false, // 滑动状态
      swipeWidth: 0, // 单个swipeItem的宽度
      timeId: null, // timeId
    };
  },
  created() {
    // 数据处理 url处理
    const urlListLen = this.urlList && this.urlList.length;
    const urlListTem = JSON.parse(JSON.stringify(this.urlList));
    // 如果轮播图数量大于1，则在首位各追加一次
    if (urlListLen > 1) {
      this.currentList = urlListTem
        .slice(-1)
        .concat(urlListTem)
        .concat(urlListTem.slice(0, 1));
    } else if (urlListLen === 1) {
      // 当只有一个轮播图时候
      this.currentList = urlListTem;
    }
    this.currentListLen = this.currentList.length;
    this.indicatorIndex = this.startIndex;
    this.activeIndex = this.startIndex + 1;
  },
  mounted() {
    this.init();
    // 监听页面大小发生变化，重新初始化参数
    window.addEventListener("resize", this.init);
  },
  destroyed() {
    // window.removeEventListener("resize");
    clearInterval(this.timeId);
  },
  methods: {
    // 初始化
    init() {
      this.swipeWidth = this.$refs.swipe.clientWidth; // 获取单个swipeItem的宽度
      this.maxTransX = -(this.currentListLen - 1) * this.swipeWidth; // 最大滑动距离
      this.transX = this.preX = this.calcTrans(); // 初始化滑动距离
      this.autoplay && this.autoPlayFn(); // 自动播放
    },
    // 鼠标进入 - enter
    enterFn() {
      this.transState = false;
    },
    // 鼠标离开 - leave
    leaveFn() {
      this.transState && this.endFn();
    },
    // 开始 - start
    startFn(e) {
      this.autoPlayFn && clearInterval(this.timeId);
      // 滑动状态 - 开启
      this.transState = true;
      // 点击/触控元素的位置
      this.startX = this.calcX(e, "mousedown");
    },
    // 移动 -  move
    moveFn(e) {
      e.preventDefault();
      if (this.ingoreTrans()) return;
      if (this.transState) {
        this.diffX = this.calcX(e, "mousemove") - this.startX;
        // 临界值处理 - 滑动到一张或者最后一张轮播图时候
        if (this.transX >= 0 || this.transX <= this.maxTransX) {
          return;
        }
        // 时时滑动
        this.transX = this.diffX + this.preX;
      }
    },
    // 计算距离
    calcX(e, eventType) {
      const type = e && e.type;
      if (type === eventType) {
        return e.clientX;
      } else {
        return e.touches[e.touches.length - 1].clientX;
      }
    },
    // 结束 - end
    endFn() {
      if (this.ingoreTrans()) return;
      // 滑动距离绝对值
      const diffXAbs = Math.abs(this.diffX);
      // 滑过轮播图个数
      const count = Math.floor(diffXAbs / this.swipeWidth);
      // 与滑动距离临界值进行对比 判断是否划入下一张轮播图中
      const critialVal = diffXAbs / this.swipeWidth - count;
      // 左滑
      if (this.diffX > 0) {
        this.activeIndex -= count;
        if (critialVal >= this.cirticalVal) {
          this.activeIndex -= 1;
        }
        this.activeIndex = this.fixIndex(this.activeIndex);
      } else if (this.diffX < 0) {
        // 右滑
        this.activeIndex += count;
        if (critialVal >= this.cirticalVal) {
          this.activeIndex += 1;
        }
        this.activeIndex = this.fixIndex(this.activeIndex, false);
      }
      // 滑动状态关闭
      this.transState = false;
      // 开启动画
      this.isTrans = true;
      this.transX = this.preX = this.calcTrans();
    },
    // 修正索引值
    fixIndex(i, isFirst = true) {
      if (isFirst) {
        return i < 0 ? 0 : i;
      } else {
        return i > this.currentListLen - 1 ? this.currentListLen - 1 : i;
      }
    },
    // 动画结束 - end
    transEndFn() {
      // 关闭缓动动画
      this.isTrans = false;
      // 当滑动到最后或者第一张时候，瞬间拉回回当前轮播图实际位置
      if (this.activeIndex === 0) {
        this.activeIndex = this.indicatorIndex =  this.currentListLen - 2;
      } else if (this.activeIndex === this.currentListLen - 1) {
        this.activeIndex = 1;
      }
      this.indicatorIndex = this.activeIndex - 1;
      this.transX = this.preX = this.calcTrans();
      // this.$emit("change", this.activeIndex - 1);
      this.autoPlayFn && this.autoPlayFn();
    },
    // 计算滑动位置
    calcTrans() {
      return -this.activeIndex * this.swipeWidth;
    },
    // 忽略滑动 - 当动画结束后或只有一张图片时候
    ingoreTrans() {
      return this.isTrans || this.currentListLen === 1;
    },
    // 自动轮播
    autoPlayFn() {
      clearInterval(this.timeId);
      // this.timeId = setInterval(() => {
      //   this.activeIndex += 1;
      //   this.activeIndex = this.fixIndex(this.activeIndex, false);
      //   this.isTrans = true;
      //   this.transX = this.preX = this.calcTrans();
      // }, this.autoPlayTime);
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
  // width: 100px;
  // margin: 0 auto;
  width: 100%;
  background-color: yellow;
  font-size: 0;
  overflow: hidden;
  @include ios-fix;
  .swipe {
    white-space: nowrap;
    @include ios-fix;
    .swipe-item-wrapper {
      width: 100%;
      display: inline-block;
      @include ios-fix;
      .swipe-item {
        font-size: 30px;
        text-align: center;
        width: 100%;
        height: 60px;
        color: #fff;
      }
    }
  }
  .indicator {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    .indicator-item-wrapper{
      margin-right: $px-4;
      .indicator-item{
        width: $px-8;
        height: $px-8;
        border-radius: 100%;
        background-color: $c-white;
        opacity: 0.6;

        &.indicator-item-active{
          opacity: 1;
        }
      }

    }
  }
}
</style>