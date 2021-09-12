<template>
  <div id="preview">
    <!-- 缩略图 -->
    <thumbnail
      :list="thumbnailList"
      :activeIndex="thumbnaiActiveIndex"
      :click="handleThumbnail"
      :previewState="previewState"
      :thumbnailState="thumbnailState"
    />
    <!-- 预览图 -->
    <transition name="preview">
      <div
        v-if="previewState"
        class="preview"
        @touchstart.prevent="startFn"
        @touchmove.prevent="moveFn"
        @touchend.prevent="endFn"
      >
        <div
          class="preview-container"
          @transitionend="transEndFn"
          :style="{
            transform: `translateX(${transX}px)`,
            transition: isTrans ? 'transform .35s ease-out' : '',
          }"
        >
          <div
            class="preview-item-wrapper"
            v-for="item in previewList"
            :key="item.id"
          >
            <div
              class="preview-item"
              @transitionend="transItemEndFn"
              :style="{
                backgroundImage: `url(${item.previewUrl})`,
                left: isAcitve(item.id) ? `${scaleLeft}px` : '0px',
                top: isAcitve(item.id) ? `${scaleTop}px` : '0px',
                width: isAcitve(item.id) ? `${scaleWidth}px` : '100%',
                height: isAcitve(item.id) ? `${scaleHeight}px` : '100%',
                transform: isAcitve(item.id)
                  ? `translate(${scaleTransX}px,${scaleTransY}px) scale(${scaleVal})`
                  : '',
                transformOrigin: `${scaleOriginX}px ${scaleOriginY}px`,
                transition:
                  isAcitve(item.id) && isDoubleTap ? `all .25s ease-out` : '',
              }"
            ></div>
          </div>
        </div>
        <div class="counter" v-if="showCounter && listLen > 1">
          {{ activeIndex + 1 }} / {{ listLen }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script scope>
import { forEach } from "lodash";
import Thumbnail from "./Thumbnail.vue";
export default {
  name: "Preview",
  props: {
    list: {
      type: Array,
      default: () => [],
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
  },
  data() {
    return {
      thumbnailList: [], // 缩略图
      previewList: [], // 预览图
      previewState: false, // 预览图状态 true:开启  false:关闭
      thumbnailState: false, // 缩略图状态 true:放大  false: 恢复正常
      scaleState: false, // 缩放状态 true: 缩放中 false: 恢复正常
      thumbnaiActiveIndex: 0, // 缩略图索引
      activeIndex: 0, // 预览图索引
      fignerType: 0, // 1:正常单指拖动  2:双指缩放  3:缩放后拖动
      touchesCount: 0, // 触控点数量
      width: 0, // 屏幕宽度，px
      height: 0, // 屏幕高度，px
      // 正常单指滑动
      initX: 0, // 初始值，px
      startX: 0, // 手指触控起始位置，px
      diffX: 0, // 手指滑动距离，px
      transX: 0, // 滑动值，px
      isTrans: false, // 是否正在滑动中
      boundaryX: 0, // 右边界，px
      // 判断单击、双击
      eventTimeStamp: 0,
      eventX: 0,
      eventY: 0,
      tapCount: 0,
      timeId: null,
      isDoubleTap: false, // 是否正在放大中
      // 双击放大
      scaleStartX: 0,
      scaleStartY: 0,
      scaleOriginX: 0,
      scaleOriginY: 0,
      scaleTransX: 0,
      scaleTransY: 0,
      scaleBoundaryX: 0, // 右边界
      scaleBoundaryY: 0, // 下边界
      scaleLeft: 0,
      scaleWidth: 0,
      scaleHeight: 0,
      scaleTop: 0,
      scaleVal: 1,
      isBoundary: false, // 是否到达了边界
    };
  },
  computed: {
    listLen() {
      return this.$isArray(this.previewList);
    },
    // 忽略滑动
    ingoreTrans() {
      return this.listLen < 1 || this.touchesCount > 2;
      //   this.isTrans ||
      //   this.isDoubleTap ||
    },
    // 边界值
    boundaryTop() {
      return -this.scaleVal * this.height;
    },
    // 边界值
    boundaryLeft() {
      return -this.scaleVal * this.width;
    },
  },
  watch: {
    previewState(val) {
      document.body.style.overflow = val ? "hidden" : "";
    },
  },
  created() {
    // 数据处理
    forEach(this.$deepCopy(this.list), (item, index) => {
      this.thumbnailList.push({
        thumbnailUrl: item.thumbnailUrl,
        id: index,
      });
      this.previewList.push({
        previewUrl: item.previewUrl,
        id: index,
      });
    });
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      this.width = this.scaleWidth = window.innerWidth;
      this.height = this.scaleHeight = window.innerHeight;
      this.boundaryX = this.getTransX(this.listLen - 1);
    },
    // 激活索引
    isAcitve(id) {
      return this.activeIndex === id;
    },
    // 缩略图处理
    handleThumbnail(thumbnailState, id) {
      // 显示预览图
      if (thumbnailState) {
        this.showPreview(id);
      } else {
        // 隐藏预览图
        this.hidePreview();
      }
    },
    // 隐藏预览图
    hidePreview() {
      this.previewState = false;
      this.thumbnailState = false;
      this.resetNormal();
    },
    // 显示预览图
    showPreview(id) {
      this.thumbnaiActiveIndex = this.activeIndex = id;
      // this.thumbnailState = true;
      this.previewState = true;
      this.transX = this.initX = this.getTransX(id);
    },
    // 滑动开始 - start
    startFn(e) {
      this.touchesCount = e.touches.length;
      if (this.ingoreTrans) return;
      //  单指
      if (this.touchesCount === 1) {
        // 缩放后单指拖动 - start
        if (this.scaleState) {
          this.fignerType = 3;
          this.scaleStartFn(e);
        } else {
          // 正常拖动 - start
          this.fignerType = 1;
          this.slideStartFn(e);
        }
      } else if (this.touchesCount === 2) {
        // 双指缩放 - start
        this.fignerType = 2;
      }
      // 单击和双击事件判断
      this.eventTimeStamp = e.timeStamp;
      const { x, y } = this.getClient(e);
      this.eventX = x;
      this.eventY = y;
    },
    // 滑动中 - move
    moveFn(e) {
      this.touchesCount = e.touches.length;
      if (this.ingoreTrans) return;
      // 正常拖动 - move
      if (this.touchesCount === 1 && this.fignerType === 1) {
        this.slideMoveFn(e);
      } else if (this.touchesCount === 1 && this.fignerType === 3) {
        // 缩放后单指拖动 - move
        this.scaleMoveFn(e);
      } else if (this.touchesCount === 2 && this.fignerType === 2) {
        // 双指缩放
      }
    },
    // 滑动结束 - end
    endFn(e) {
      if (this.ingoreTrans) return;
      // 单指
      if (this.touchesCount === 1) {
        // 正常拖动 - end
        if (this.fignerType === 1) {
          this.slideEndFn();
        } else if (this.fignerType === 3) {
          // 缩放后单指拖动 - end
          this.scaleEndFn();
        }
        // 单击事件
        this.singleTapFn(e);
        // 双击事件
        this.doubelTapFn(e);
      } else if (this.touchesCount === 2 && this.fignerType === 2) {
        // 双指缩放 - end
        console.log("双指缩放-end");
      }
    },
    // 动画结束 - end
    transEndFn() {
      this.isTrans = false;
    },
    transItemEndFn() {
      this.isDoubleTap = false;
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
          this.hidePreview();
        }, 250);
      }
    },
    // 双击事件
    doubelTapFn(e) {
      const { clientX, clientY } = e.changedTouches[0];
      if (
        e.timeStamp - this.eventTimeStamp < 250 &&
        Math.abs(clientX - this.eventX) < 30 &&
        Math.abs(clientY - this.eventY) < 30 &&
        this.tapCount === 2
      ) {
        clearTimeout(this.timeId);
        this.tapCount = 0;
        this.isDoubleTap = true;
        // 恢复正常
        if (this.scaleState) {
          this.resetNormal();
        } else {
          // 双击放大
          this.doubelTapEnlargeFn(clientX, clientY);
        }
      }
    },
    // 恢复正常 - 1倍
    resetNormal() {
      console.log("恢复正常");
      this.scaleState = false;
      this.fignerType = 0;
      this.scaleWidth = this.width;
      this.scaleHeight = this.height;
      this.scaleLeft = this.scaleBoundaryX = 0;
      this.scaleTop = this.scaleBoundaryY = 0;
      this.scaleTransX = 0;
      this.scaleTransY = 0;
    },
    // 双击放大 - 2倍
    doubelTapEnlargeFn(clientX, clientY) {
      console.log("双击放大");
      this.scaleState = true;
      this.scaleOriginX = clientX;
      this.scaleOriginY = clientY;
      this.scaleLeft = this.scaleBoundaryX = -this.scaleOriginX;
      this.scaleTop = this.scaleBoundaryY = -this.scaleOriginY;
      this.scaleWidth = this.width * 2;
      this.scaleHeight = this.height * 2;
    },
    getTransX(i) {
      return -i * this.width;
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
      // 缩放后单指左右滑动时候
      const { x } = this.getClient(e);
      this.diffX = x - this.startX;
      // 缩放后边界值处理
      // if (this.scaleState) {
      //   if (this.transX >= 0 || this.transX <= this.boundaryX) {
      //     this.isBoundary = true;
      //   }
      //   this.isBoundary = false;
      // }
      this.transX = this.diffX + this.initX;
    },
    // 正常拖动 - end
    slideEndFn() {
      console.log("正常拖动 - end");
      const diffXAbs = Math.abs(this.diffX);
      const itemCount = Math.trunc(diffXAbs / this.width);
      const critialVal = diffXAbs / this.width - itemCount;
      // 滑动到下一张
      const lastActiveIndex = this.activeIndex;
      if (this.diffX < 0) {
        this.isTrans = true;
        this.activeIndex += itemCount;
        if (critialVal >= this.criticalVal) {
          this.activeIndex++;
        }
        this.activeIndex = this.fixIndex(this.activeIndex);
      } else if (this.diffX > 0) {
        this.isTrans = true;
        // 滑动到前一张
        this.activeIndex -= itemCount;
        if (critialVal >= this.criticalVal) {
          this.activeIndex--;
        }
        this.activeIndex = this.fixIndex(this.activeIndex, false);
      }
      this.thumbnaiActiveIndex = this.activeIndex;
      // 缩放重设
      if (lastActiveIndex !== this.activeIndex) {
        this.resetNormal();
      }
      this.transX = this.initX = this.getTransX(this.activeIndex);
    },
    // 缩放后单指拖动 - start
    scaleStartFn(e) {
      console.log("单指拖动-start");
      const { x, y } = this.getClient(e);
      this.scaleStartX = x;
      this.scaleStartY = y;
    },
    // 缩放后单指拖动 - move
    scaleMoveFn(e) {
      console.log("缩放后单指拖动-move");
      const { x, y } = this.getClient(e);
      let scaleTransX = x - this.scaleStartX;
      let scaleTransY = y - this.scaleStartY;
      // 右边界值
      this.scaleBoundaryX = scaleTransX + this.scaleLeft;
      // 下边界值
      this.scaleBoundaryY = scaleTransY + this.scaleTop;
      // 左右边界处理
      if (
        this.scaleBoundaryX >= 0 ||
        this.scaleBoundaryX <= this.boundaryLeft
      ) {
        this.slideMoveFn(e);
        // this.scaleStartX = x;
        // this.scaleStartY = y;
        return;
      }
      // 上下边界处理
      if (this.scaleBoundaryY >= 0 || this.scaleBoundaryY <= this.boundaryTop) {
        return;
      }
      // 边界处理
      this.slideStartFn(e);
      this.scaleTransX = scaleTransX;
      this.scaleTransY = scaleTransY;
    },
    // 缩放后单指拖动 - end
    scaleEndFn() {
      console.log("缩放后单指拖动-end");
      if (
        this.scaleBoundaryX >= 0 ||
        this.scaleBoundaryX <= this.boundaryLeft
      ) {
        this.slideEndFn();
      }
      // 修正临界值
      const { boundaryLeft, boundaryTop } = this.fixBoundary(
        this.scaleTransX + this.scaleLeft,
        this.scaleTransY + this.scaleTop
      );
      this.scaleLeft = this.scaleBoundaryX = boundaryLeft;
      this.scaleTop = this.scaleBoundaryY = boundaryTop;
      this.scaleTransX = 0;
      this.scaleTransY = 0;
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
    // 边界值修正
    fixBoundary(boundaryLeft, boundaryTop) {
      if (boundaryLeft > 0) {
        boundaryLeft = 0;
      } else if (boundaryLeft < this.boundaryLeft) {
        boundaryLeft = -this.width;
      }
      if (top > 0) {
        boundaryTop = 0;
      } else if (boundaryTop < this.boundaryTop) {
        boundaryTop = -this.height;
      }
      return {
        boundaryLeft,
        boundaryTop,
      };
    },
  },
  components: {
    Thumbnail,
  },
};
</script>
<style scoped lang="scss">
.preview {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  transition: opacity 0.5s;
  background-color: $c-black;
  z-index: $z-index-sm;
  overflow: hidden;
  opacity: 1;
  @include ios-fix;
  .preview-container {
    width: 100%;
    height: 100%;
    white-space: nowrap;
    @include ios-fix;
    .preview-item-wrapper {
      position: relative;
      display: inline-block;
      width: 100%;
      height: 100%;
      overflow: hidden;
      @include ios-fix;
      overflow: hidden;
      .preview-item {
        position: absolute;
        background: currentColor no-repeat center center/contain;
        @include ios-fix;
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