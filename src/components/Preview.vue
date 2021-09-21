<template>
  <transition name="preview">
    <div
      v-if="previewState"
      class="preview"
      @touchstart.prevent="startFn"
      @touchmove.prevent="moveFn"
      @touchend.prevent="endFn"
    >
      <ul
        class="preview-container"
        @transitionend="transEndFn"
        :style="{
          transform: `translateX(${transX}px)`,
          transition: isTrans ? 'transform .35s ease-out' : '',
        }"
      >
        <li class="preview-item-wrapper" v-for="item in list" :key="item.id">
          <div
            class="preview-item"
            @transitionend="transScaleEndFn"
            :style="{
              backgroundImage: `url(${item.previewUrl})`,
              left: isActive(item.id) ? `${scaleLeft}px` : '0px',
              top: isActive(item.id) ? `${scaleTop}px` : '0px',
              width: isActive(item.id) ? `${scaleWidth}px` : '100%',
              height: isActive(item.id) ? `${scaleHeight}px` : '100%',
              transform: isActive(item.id)
                ? `translate(${scaleTransX}px,${scaleTransY}px) scale(${scaleVal})`
                : '',
              transformOrigin: `${scaleOriginX}px ${scaleOriginY}px`,
              transition:
                isActive(item.id) && isScaling ? `all .16s ease-out` : '',
            }"
          ></div>
        </li>
      </ul>
      <div class="counter" v-if="showCounter && listLen > 1">
        {{ activeIndex + 1 }} / {{ listLen }}
      </div>
    </div>
  </transition>
</template>

<script>
import { isArray } from "lodash";
export default {
  name: "Preiview",
  props: {
    // 预览图list
    list: {
      type: Array,
      default: () => [],
    },
    // 预览图状体啊
    previewState: {
      type: Boolean,
      default: () => false,
    },
    // 起始index
    startIndex: {
      type: Number,
      default: () => 0,
    },
    // 单击事件
    singleTap: {
      type: Function,
      default: () => {},
    },
    // 临界值
    criticalVal: {
      type: Number,
      default: () => 1 / 3,
    },
    // 是否显示计数器
    showCounter: {
      type: Boolean,
      default: () => true,
    },
    // 最大缩放倍数
    maxScaleVal: {
      type: Number,
      default: () => 5,
    },
  },
  data() {
    return {
      activeIndex: 0, // 激活的预览图
      scaleState: false, // 缩放状态 true: 缩放中 false: 恢复正常
      fingerType: 0, // 1:正常单指拖动  2:双指缩放  3:缩放后拖动
      width: 0, // 屏幕宽度，px
      height: 0, // 屏幕高度，px
      // 正常单指滑动
      initX: 0, // 初始值，px
      startX: 0, // 手指触控起始位置，px
      diffX: 0, // 手指滑动距离，px
      transX: 0, // 滑动值，px
      isTrans: false, // 是否正在滑动中
      // touchesCount: 0, // 触控点数量
      // 判断单击、双击
      eventTimeStamp: 0,
      eventX: 0,
      eventY: 0,
      tapCount: 0,
      timeId: null,
      isScaling: false, // 是否双击缩放
      // 缩放
      scaleStartX: 0, // 缩放水平起始位置
      scaleStartY: 0, //缩放垂直起始
      scaleOriginX: 0, // 缩放水平原点
      scaleOriginY: 0, // 缩放垂直原点
      scaleTransX: 0, // 缩放后水平滑动距离
      scaleTransY: 0, // 缩放后垂直滑动距离
      // scaleLastTransX: 0, // 滑动边界值时偏移位置
      scaleWidth: 0, // 缩放后宽度
      scaleHeight: 0, // 缩放后高度
      scaleTop: 0, // 缩放后上偏移值
      scaleLeft: 0, // 缩放后左偏移值
      scaleVal: 1, // 缩放比例
      touchesDistance: 0, // 缩放双指距离
      isDoubleTap: false, // 双击事件
    };
  },
  computed: {
    listLen() {
      return isArray(this.list) && this.list.length;
    },
    // 忽略滑动
    ignoreTrans() {
      return this.listLen < 1 || this.isScaling;
    },
    // 正常滑动右边界值
    boundaryX() {
      return -(this.listLen - 1) * this.width;
    },
    // 缩放后下边界值
    boundaryBottom() {
      return -(this.scaleHeight - this.height);
    },
    // 缩放后右边界值
    boundaryRight() {
      return -(this.scaleWidth - this.width);
    },
    // 缩放后最大宽度
    maxScaleWidth() {
      return this.maxScaleVal * this.width;
    },
  },
  watch: {
    activeIndex(val) {
      this.$emit("change", val);
    },
    previewState(val) {
      if (!val) return;
      this.activeIndex = this.startIndex;
      this.transX = this.getTransX(this.activeIndex);
      this.initX = this.transX;
    },
  },
  created() {
    this.activeIndex = this.startIndex;
  },
  mounted() {
    this.init();
    window.addEventListener("resize", this.init);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.init);
  },
  methods: {
    // 初始化
    init() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.scaleWidth = window.innerWidth;
      this.scaleHeight = window.innerHeight;
      // this.resetNormal();
    },
    // 滑动开始 - start
    startFn(e) {
      const touchesCount = e.touches.length;
      console.log("start:", touchesCount);
      // this.touchesCount = touchesCount;
      if (this.ignoreTrans || touchesCount > 2) return;
      //  单指
      if (touchesCount === 1) {
        // 缩放后单指拖动 - start
        if (this.scaleState) {
          if (this.isTransState()) return; // 正常单指滑动中
          this.fingerType = 3;
          this.scaleStartFn(e);
        } else {
          // 正常拖动 - start
          this.fingerType = 1;
          this.slideStartFn(e);
        }
      } else if (touchesCount === 2) {
        if (this.isTransState()) return; // 正常单指滑动中
        // 双指缩放 - start
        this.fingerType = 2;
        this.doubleTouchesStartFn(e);
      }
      // 单击和双击事件判断
      this.eventTimeStamp = e.timeStamp;
      const { x, y } = this.getClient(e);
      this.eventX = x;
      this.eventY = y;
    },
    // 滑动中 - move
    moveFn(e) {
      const touchesCount = e.touches.length;
      console.log("move:", touchesCount);
      if (this.ignoreTrans || touchesCount > 2) return;
      // 正常拖动 - move
      if (touchesCount === 1 && this.fingerType === 1) {
        this.slideMoveFn(e);
      } else if (touchesCount === 1 && this.fingerType === 3) {
        // 缩放后单指拖动 - move
        this.scaleMoveFn(e);
      } else if (touchesCount === 2 && this.fingerType === 2) {
        // 双指缩放
        this.doubleTouchesMoveFn(e);
      }
    },
    // 滑动结束 - end
    endFn(e) {
      const touchesCount = e.touches.length;
      console.log("end:", touchesCount);

      if (this.ignoreTrans || touchesCount >= 2) return;
      // 单指
      if (touchesCount === 0) {
        console.log("单击或双击");
        this.singleTapFn(e); // 单击事件
        this.doubleTapFn(e); // 双击事件
      }
      if (this.fingerType === 1) {
        touchesCount === 0 && this.slideEndFn(); // 正常拖动 - end
      } else if (this.fingerType === 3) {
        // 缩放后单指拖动 - end
        touchesCount === 0 && this.scaleEndFn();
      } else if (this.fingerType === 2) {
        touchesCount === 1 && this.doubleTouchesEndFn(); // 双指缩放 - end
      }
      // 误滑动处理后
      if (this.isTransState()) {
        this.isTrans = true;
        this.transX = this.getTransX(this.activeIndex);
        this.initX = this.transX;
      }
    },
    // 动画结束 - end
    transEndFn() {
      this.isTrans = false;
    },
    // 缩放动画结束 - end
    transScaleEndFn() {
      this.isScaling = false;
    },
    // 单击事件
    singleTapFn(e) {
      const { clientX, clientY } = e.changedTouches[0];
      if (
        e.timeStamp - this.eventTimeStamp < 250 &&
        Math.abs(clientX - this.eventX) < 10 &&
        Math.abs(clientY - this.eventY) < 10
      ) {
        this.tapCount++;
        clearTimeout(this.timeId);
        this.timeId = setTimeout(() => {
          console.log("单击事件");
          this.tapCount = 0;
          this.resetNormal();
          this.singleTap();
        }, 250);
      }
    },
    // 双击事件
    doubleTapFn(e) {
      const { clientX, clientY } = e.changedTouches[0];
      if (
        e.timeStamp - this.eventTimeStamp < 250 &&
        Math.abs(clientX - this.eventX) < 30 &&
        Math.abs(clientY - this.eventY) < 30 &&
        this.tapCount === 2
      ) {
        this.isDoubleTap = true;
        clearTimeout(this.timeId);
        this.tapCount = 0;
        this.isScaling = true; // 是否正在缩放中
        // 恢复正常
        if (this.scaleState) {
          this.isDoubleTap = false;
          this.resetNormal();
        } else {
          // 双击放大
          this.doubelTapEnlargeFn(clientX, clientY);
        }
      }
    },
    // 恢复正常
    resetNormal() {
      console.log("恢复正常");
      this.scaleState = false;
      this.fingerType = 0;
      this.scaleWidth = this.width;
      this.scaleHeight = this.height;
      this.scaleLeft = 0;
      this.scaleTop = 0;
      this.scaleTransX = 0;
      // this.scaleLastTransX = 0;
      this.scaleTransY = 0;
      this.scaleOriginX = 0;
      this.scaleOriginY = 0;
      this.scaleVal = 1;
    },
    // 双击放大
    doubelTapEnlargeFn(clientX, clientY) {
      console.log("双击放大");
      this.scaleState = true;
      this.scaleOriginX = clientX;
      this.scaleOriginY = clientY;
      this.scaleLeft = -this.scaleOriginX;
      this.scaleTop = -this.scaleOriginY;
      this.scaleWidth = this.width * 2;
      this.scaleHeight = this.height * 2;
      this.isDoubleTap = false;
    },
    // 正常拖动 - start
    slideStartFn(e) {
      console.log("正常拖动 - start");
      const { x } = this.getClient(e);
      this.diffX = 0;
      this.startX = x;
    },
    // 正常拖动 - move
    slideMoveFn(e) {
      console.log("正常拖动 - move");
      const { x } = this.getClient(e);
      this.diffX = x - this.startX;
      // 缓动拖动
      if (this.transX >= 0 || this.transX <= this.boundaryX) {
        this.transX = this.diffX / this.maxScaleVal + this.initX;
        return;
      }
      this.transX = this.diffX + this.initX;
    },
    // 正常拖动 - end
    slideEndFn() {
      console.log("正常拖动 - end");
      const diffXAbs = Math.abs(this.diffX);
      const critialVal =
        diffXAbs / this.width - Math.trunc(diffXAbs / this.width);
      // 滑动到下一张
      if (this.diffX < 0) {
        this.isTrans = true;
        if (critialVal >= this.criticalVal) {
          this.activeIndex++;
        }
        this.activeIndex = this.fixIndex(this.activeIndex);
      } else if (this.diffX > 0) {
        // 滑动到前一张
        this.isTrans = true;
        if (critialVal >= this.criticalVal) {
          this.activeIndex--;
        }
        this.activeIndex = this.fixIndex(this.activeIndex, false);
      }
      this.transX = this.getTransX(this.activeIndex);
      this.initX = this.transX;
    },
    // 缩放后单指拖动 - start
    scaleStartFn(e) {
      console.log("缩放后单指拖动-start");
      const { x, y } = this.getClient(e);
      this.scaleStartX = x;
      this.scaleStartY = y;
    },
    // 缩放后单指拖动 - move
    scaleMoveFn(e) {
      console.log("缩放后单指拖动 - move");
      const { x, y } = this.getClient(e);
      let scaleTransX = x - this.scaleStartX;
      let scaleTransY = y - this.scaleStartY;
      // 右边界值
      const scaleBoundaryX = scaleTransX + this.scaleLeft;
      // 下边界值
      const scaleBoundaryY = scaleTransY + this.scaleTop;
      // 超出左右边界处理
      if (scaleBoundaryX >= 0 || scaleBoundaryX <= this.boundaryRight) {
        // 缩放后左右超边界，可以允许上下可以滑动
        if (scaleBoundaryY <= 0 && scaleBoundaryY >= this.boundaryBottom) {
          this.scaleTransY = scaleTransY;
        }
        return;
      }
      // 超出上下边界处理
      if (scaleBoundaryY >= 0 || scaleBoundaryY <= this.boundaryBottom) {
        //  缩放后上下超边界，可以允许左右可以滑动
        if (scaleBoundaryX <= 0 && scaleBoundaryX >= this.boundaryRight) {
          this.scaleTransX = scaleTransX;
        }
        return;
      }
      this.scaleTransX = scaleTransX;
      this.scaleTransY = scaleTransY;
      // this.scaleLastTransX = scaleTransX; // 滑动边界值时的水平位置
    },
    // 缩放后单指拖动 - end
    scaleEndFn() {
      console.log("缩放后单指拖动-end");
      // 修正临界值
      const { left, top } = this.fixScaleBoundary(
        this.scaleTransX + this.scaleLeft,
        this.scaleTransY + this.scaleTop
      );
      this.scaleLeft = left;
      this.scaleTop = top;
      this.scaleTransX = 0;
      this.scaleTransY = 0;
      // this.scaleLastTransX = 0;
    },
    // 双指缩放 - start
    doubleTouchesStartFn(e) {
      console.log("双指缩放 - start");
      this.scaleState = true;
      const touch0 = e.touches[0];
      const touch1 = e.touches[1];
      this.touchesDistance = this.getDistance(touch0, touch1);
      const { x, y } = this.getScaleOrigin(touch0, touch1);
      this.scaleOriginX = x;
      this.scaleOriginY = y;
    },
    // 双指缩放 - move
    doubleTouchesMoveFn(e) {
      console.log("双指缩放 - move");
      const touch0 = e.touches[0];
      const touch1 = e.touches[1];
      this.scaleVal = this.getDistance(touch0, touch1) / this.touchesDistance;
    },
    // 双指缩放 - end
    doubleTouchesEndFn() {
      console.log("双指缩放 - end");
      let scaleVal = this.scaleVal;
      if (scaleVal === 1) return; // 缩放倍数为1，不做任何处理
      let scaleWidth = scaleVal * this.scaleWidth;
      // 缩放后宽度小于等于最大视口宽度
      if (scaleWidth <= this.width) {
        console.log("双指缩放 - 恢复正常");
        this.scaleState = false;
        scaleWidth = this.width;
        scaleVal = this.width / this.scaleWidth; // 重新计算缩放比
      } else if (scaleWidth > this.maxScaleWidth) {
        // 缩放后宽度大于最大缩放宽度
        console.log("双指缩放 - 最大缩放值");
        scaleWidth = this.maxScaleWidth;
        scaleVal = this.maxScaleWidth / this.scaleWidth; // 重新计算缩放比
      }
      this.scaleVal = scaleVal;
      this.scaleWidth = scaleWidth;
      this.scaleHeight = scaleVal * this.scaleHeight;
      const { left, top } = this.getScaleTrans(scaleVal);
      this.scaleLeft = left;
      this.scaleTop = top;
      this.scaleVal = 1;
    },
    // 双指缩放 - 双指距离
    getDistance(t0, t1) {
      return Math.sqrt(
        Math.pow(t1.clientX - t0.clientX, 2) +
          Math.pow(t1.clientY - t0.clientY, 2)
      );
    },
    // 双指缩放 - 缩放原点
    getScaleOrigin(t0, t1) {
      return {
        x: (t0.clientX + t1.clientX) / 2 - this.scaleLeft,
        y: (t0.clientY + t1.clientY) / 2 - this.scaleTop,
      };
    },
    // 缩放后定位位置
    getScaleTrans(scaleVal) {
      const { left, top } = this.fixScaleBoundary(
        -(scaleVal - 1) * this.scaleOriginX + this.scaleLeft,
        -(scaleVal - 1) * this.scaleOriginY + this.scaleTop
      );
      return {
        left,
        top,
      };
    },
    // 获取正常滑动偏移值
    getTransX(i) {
      return -i * this.width;
    },
    // 获取坐标位置
    getClient(e) {
      return {
        x: e.touches[e.touches.length - 1].clientX,
        y: e.touches[e.touches.length - 1].clientY,
      };
    },
    // 修正索引值
    fixIndex(i, isNext = true) {
      if (isNext) {
        return i > this.listLen - 1 ? this.listLen - 1 : i;
      } else {
        return i < 0 ? 0 : i;
      }
    },
    // 缩放后边界值修正
    fixScaleBoundary(left, top) {
      const leftTem = left;
      const topTem = top;
      if (left > 0) {
        left = 0;
      } else if (left < this.boundaryRight) {
        left = this.boundaryRight;
      }
      if (top > 0) {
        top = 0;
      } else if (top < this.boundaryBottom) {
        top = this.boundaryBottom;
      }
      if (left !== leftTem || top !== topTem) {
        this.isScaling = true;
      }
      return {
        left,
        top,
      };
    },
    // 激活索引
    isActive(id) {
      return this.activeIndex === id;
    },
    // 是否正在单指滑动中
    isTransState() {
      return this.transX !== this.getTransX(this.activeIndex);
    },
  },
};
</script>


<style scoped lang="scss">
// 清除ul默认样式
@mixin clear-ul-style {
  list-style: none;
  padding: 0;
  margin: 0;
}
// 修复ios设备上滑动时候闪屏问题
@mixin ios-fix {
  -webkit-backface-visibility: hidden;
  -webkit-transform-style: preserve-3d;
}
.preview {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  transition: opacity 0.5s;
  background-color: $c-black;
  z-index: $z-index-sm;
  opacity: 1;
  @include ios-fix;
  .preview-container {
    width: 100%;
    height: 100%;
    display: flex;
    @include ios-fix;
    @include clear-ul-style;
    .preview-item-wrapper {
      position: relative;
      flex: 0 0 100%;
      overflow: hidden;
      box-sizing: border-box;
      @include ios-fix;
      .preview-item {
        position: absolute;
        font-size: 0;
        background: transparent no-repeat center center/contain;
      }
    }
  }
  .counter {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    line-height: 2;
    color: $c-white;
    font-size: $px-24;
  }
}
.preview-enter,
.preview-leave-to {
  opacity: 0;
}
</style>