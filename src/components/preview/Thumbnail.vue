<template>
  <div id="thumbnail">
    <div class="thumbnail-item-wrapper" v-for="item in list" :key="item.id">
      <div
        class="thumbnail-item"
        ref="thumbnailItem"
        @click="handleClick(item.id)"
        :style="{
          backgroundImage: `url(${item.thumbnailUrl})`,
          transform:
            thumbnailState && activeIndex === item.id
              ? `translate(${transX}px,${transY}px) scale(${scaleX},${scaleY})`
              : '',
        }"
      ></div>
    </div>
  </div>
</template>

<script scope>
import { find } from "lodash";
export default {
  name: "Thumbnail",
  props: {
    // 缩略图
    list: {
      type: Array,
      default: () => [],
    },
    click: {
      type: Function,
      default: () => {},
    },
    // 缩略图点击的索引值
    activeIndex: {
      type: Number,
      default: () => 0,
    },
    // 缩略图状态  true:放大  false: 恢复正常
    thumbnailState: {
      type: Boolean,
      default: () => false,
    },
    // 预览图状态  true:开启  false:关闭
    previewState: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      thumbnailWidth: 0, // 缩略图宽度，px
      thumbnailHeight: 0, // 缩略图高度，px
      scaleX: 1, // 缩略图水平放大比例
      scaleY: 1, // 缩略图垂直放大比例
      transX: 0, // 缩略图水平平移距离，px
      transY: 0, // 缩略图垂直平移距离，px
      width:0,// 
      height:0 // 
    };
  },
  mounted() {
    this.init();
    window.addEventListener('resize',this.resetInit)
  },
  watch: {
    activeIndex(newVal, oldVal) {
      if (newVal !== oldVal && this.previewState) {
        this.enlargeThumbnail(newVal);
      }
    },
  },
  beforeDestroy(){
    window.removeEventListener('resize',this.resetInit)
  },
  methods: {
    resetInit(){
      this.init()
    },
    // 初始化
    init() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.thumbnailWidth = this.$refs.thumbnailItem[0].clientWidth;
      this.thumbnailHeight = this.$refs.thumbnailItem[0].clientHeight;
      this.scaleX = this.width / this.thumbnailWidth;
    },
    // 缩略图点击事件
    handleClick(id) {
      // 缩略图恢复正常
      if (this.thumbnailState) {
        this.click(false);
      } else {
        // 放大缩略图
        this.click(true, id);
        this.enlargeThumbnail(id);
      }
    },
    // 获取移动距离
    getTrans(id) {
      const top = this.$refs.thumbnailItem[id].getBoundingClientRect().top;
      const left = this.$refs.thumbnailItem[id].getBoundingClientRect().left;
      return {
        x: this.width / 2 - left - this.thumbnailWidth / 2,
        y: this.height / 2 - top - this.thumbnailHeight / 2,
      };
    },
    // 获取缩略图垂直放大比例
    getScaleY(id) {
      let img = new Image();
      img.src = find(this.list, (item) => {
        return id === item.id;
      }).thumbnailUrl;
      const scaleY = (img.height / img.width) * this.scaleX;
      img = null;
      return scaleY;
    },
    // 缩略图放大
    enlargeThumbnail(id) {
      const { x, y } = this.getTrans(id);
      this.transX = x;
      this.transY = y;
      this.scaleY = this.getScaleY(id);
    },
  },
};
</script>
<style scoped lang="scss">
@function calc-width($w) {
  @return (1 / $w) * 100%;
}
#thumbnail {
  display: flex;
  flex-wrap: wrap;
  .thumbnail-item-wrapper {
    flex: 0 0 calc-width(3);
    padding: 0 5px 5px;
    height: 100px;
    box-sizing: border-box;
    .thumbnail-item {
      width: 100%;
      height: 100%;
      background: currentColor no-repeat center/cover;
      transition: transform 0.5s ease-out;
      z-index: $z-index-xs;
    }
  }
}
</style>