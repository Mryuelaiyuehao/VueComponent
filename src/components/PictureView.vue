<template>
  <div id="pictureView">
    <!-- 缩略图 -->
    <div class="thumbnail">
      <div
        class="thumbnail-item-wrapper"
        v-for="item in thumbnailList"
        :key="item.id"
      >
        <div
          class="thumbnail-item"
          ref="thumbnailItem"
          @click="handleThumbnail(item.id)"
          :style="{
            backgroundImage: `url(${item.thumbnailUrl})`,
            transform:
              thumbnailState && thumbnailActiveIndex === item.id
                ? `translate(${thumbnailTransX}px,${thumbnailTransY}px) scale(${thumbnailScaleX},${thumbnailScaleY})`
                : '',
          }"
        ></div>
      </div>
    </div>
    <!-- 预览图 -->
    <preview
      :list="previewList"
      :previewState="previewState"
      :singleTap="hidePreview"
      :startIndex="startIndex"
      @change="previwChange"
    />
  </div>
</template>

<script scope>
import { forEach, isArray, cloneDeep, find } from "lodash";
import Preview from "./Preview.vue";
export default {
  name: "PictureView",
  components: {
    Preview,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      thumbnailList: [], // 缩略图
      previewList: [], // 预览图
      previewState: false, // 预览图状态 true:开启  false:关闭
      thumbnailState: false, // 缩略图状态 true:放大  false: 恢复正常
      thumbnailActiveIndex: 0, // 缩略图索引
      startIndex: 0, // 预览图起始索引
      width: 0, // 屏幕宽度，px
      height: 0, // 屏幕高度，px
      // 缩略图
      thumbnailWidth: 0, // 缩略图宽度，px
      thumbnailHeight: 0, // 缩略图高度，px
      thumbnailScaleX: 1, // 缩略图水平放大比例
      thumbnailScaleY: 1, // 缩略图垂直放大比例
      thumbnailTransX: 0, // 缩略图水平平移距离，px
      thumbnailTransY: 0, // 缩略图垂直平移距离，px
    };
  },
  computed: {
    listLen() {
      return isArray(this.previewList) && this.list.length;
    },
  },
  created() {
    // 数据处理
    forEach(cloneDeep(this.list), (item, index) => {
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
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.thumbnailWidth =
        this.$refs.thumbnailItem &&
        this.$refs.thumbnailItem[0].getBoundingClientRect().width;
      this.thumbnailHeight =
        this.$refs.thumbnailItem &&
        this.$refs.thumbnailItem[0].getBoundingClientRect().height;
    },
    // 缩略图处理
    handleThumbnail(id) {
      if (this.thumbnailState) {
        // 隐藏预览图
        this.hidePreview();
      } else {
        // 显示预览图
        this.showPreview(id);
      }
    },
    // 隐藏预览图
    hidePreview() {
      document.body.style.overflow = "";
      this.thumbnailState = false;
      this.previewState = false;
    },
    // 预览图且切换事件
    previwChange(id) {
      this.thumbnailActiveIndex = id;
      this.enlargeThumbnail(id);
    },
    // 显示预览图
    showPreview(id) {
      document.body.style.overflow = "hidden";
      this.previewState = true;
      this.thumbnailState = true;
      this.thumbnailActiveIndex = id;
      this.startIndex = id;
      this.enlargeThumbnail(id);
    },
    // 缩略图移动距离
    getThumbnailTrans(id) {
      const top =
        this.$refs.thumbnailItem &&
        this.$refs.thumbnailItem[id].getBoundingClientRect().top;
      const left =
        this.$refs.thumbnailItem &&
        this.$refs.thumbnailItem[id].getBoundingClientRect().left;
      return {
        x: this.width / 2 - left - this.thumbnailWidth / 2,
        y: this.height / 2 - top - this.thumbnailHeight / 2,
      };
    },
    // 获取缩略图垂直放大比例
    getThumbnailScale(id) {
      let img = new Image();
      img.src = find(this.thumbnailList, (item) => {
        return id === item.id;
      }).thumbnailUrl;
      const imgWith = img.width;
      const imgHeight = img.height;
      const imgRatio = imgWith / imgHeight; // 图像缩放比
      const viewRatio = this.width / this.height; // 视口宽高比
      let thumbnailScaleX = 1;
      let thumbnailScaleY = 1;
      // 图像宽高比大于视口宽高比
      if (imgRatio >= viewRatio) {
        thumbnailScaleX = this.width / this.thumbnailWidth;
        thumbnailScaleY = this.width / imgRatio / this.thumbnailHeight;
      } else {
        // 图像宽高比小于视口宽高比
        thumbnailScaleX = (this.height * imgRatio) / this.thumbnailWidth;
        thumbnailScaleY = this.height / this.thumbnailHeight;
      }
      img = null;
      return {
        thumbnailScaleX,
        thumbnailScaleY,
      };
    },
    // 缩略图放大
    enlargeThumbnail(id) {
      const { x, y } = this.getThumbnailTrans(id);
      this.thumbnailTransX = x;
      this.thumbnailTransY = y;
      const { thumbnailScaleX, thumbnailScaleY } = this.getThumbnailScale(id);
      this.thumbnailScaleX = thumbnailScaleX;
      this.thumbnailScaleY = thumbnailScaleY;
    },
  },
};
</script>
<style scoped lang="scss">
@function calc-width($w) {
  @return (1 / $w) * 100%;
}
#pictureView {
  width: 100%;
  .thumbnail {
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
        background: transparent no-repeat top/cover;
        transition: transform 0.5s ease-out;
        z-index: $z-index-xs;
      }
    }
  }
}
</style>