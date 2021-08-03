<template>
  <div id="app">
    <div class="box">
      <div class="title">srcollTab：</div>
      <scroll-tab
        :tabList="tabList"
        :start-index="3"
        @click="onConfirm"
        :wrap-style="{ width: '28%', paddingRight: '10px' }"
      >
        <template #default="slotProps">
          <div
            class="tab-item"
            :class="{
              'tab-item-choose': slotProps.index === slotProps.activiteIndex,
            }"
          >
            {{ slotProps.item }}
          </div>
        </template>
      </scroll-tab>
    </div>
    <div class="box">
      <div class="title">popup:</div>
      <div class="box-content">
        <div class="btn" @click="()=>{showBottom = true}">bottom</div>
        <div class="btn" @click="()=>{showTop = true}">top</div>
        <div class="btn" @click="()=>{showRight = true}">right</div>
        <div class="btn" @click="()=>{showLeft = true}">left</div>
        <div class="btn" @click="()=>{showCenter = true}">center</div>
      </div>
    </div>
    <div class="box">
      <div class="title">swipe：</div>
      <swipe :urlList="urlList" @change="onConfirm" :show-indicators="true" :auto-play="true">
        <template #default="slotProps">
           <div class="swipe-item" :style="{ backgroundColor: slotProps.sItem }"></div>
        </template>
      </swipe>
    </div>
    <popup v-model="showBottom" :close="()=>{showBottom = false}" :popupHeight="300" :popupPosition="'bottom'">
      <div class="popup-content">bottom</div>
    </popup>
    <popup v-model="showTop" :close="()=>{showTop = false}" :popupHeight="260" :popupPosition="'top'">
      <div class="popup-content">top</div>
    </popup>
    <popup v-model="showRight" :close="()=>{showRight = false}" :popupHeight="260" :popupPosition="'right'">
      <div class="popup-content">right</div>
    </popup>
    <popup v-model="showLeft" :close="()=>{showLeft = false}" :popupHeight="260" :popupPosition="'left'">
      <div class="popup-content">left</div>
    </popup>
    <popup v-model="showCenter" :close="()=>{showCenter = false}" :popupHeight="260" :popupPosition="'center'">
      <div class="popup-content">center</div>
    </popup>
  </div>
</template>
  
<script>
import ScrollTab from "@/components/ScrollTab.vue";
import Popup from "@/components/Popup.vue";
import Swipe from '@/components/Swipe.vue';
export default {
  name: "App",
  data() {
    return {
      tabList: [
        "星星点点",
        "一表人才",
        "万里长城",
        "省得惹我",
        "热火朝天",
        "千军万马",
        "万水千山",
        "众多非一",
      ],
      urlList:['#EC7063','#48C9B0','#5DADE2','#A569BD'],
      showBottom: false,
      showTop: false,
      showRight: false,
      showLeft: false,
      showCenter: false,
    };
  },
  methods: {
    onConfirm(val) {
      console.log(val);
    },
  },
  components: {
    ScrollTab,
    Popup,
    Swipe
  },
};
</script>

<style scope lang="scss">
#app {
  padding: 0 $px-10;
  .box {
    .title {
      font-size: $px-20;
      margin: $px-8 0;
    }
    .box-content{
      display: flex;
      flex-wrap: wrap;

      .btn{
        width:30%;
        background-color:$c-primary;
        display: inline-block;
        text-align: center;
        padding: $px-8;
        color: $c-white;
        margin: $px-8 $px-8 0 0;
        box-sizing: border-box;
      }
    }
  }
  .popup-content{
    text-align: center;
    font-size: $px-30;
    margin: 0 auto;
  }
  .tab-item {
    text-align: center;
    border: 1px solid $c-primary;
    border-radius: $px-8;
    padding: $px-8 0;
    font-size: $px-16;
  }

  .tab-item-choose {
    background-color: $c-primary;
    color: $c-white;
  }

  .swipe-item {
    text-align: center;
    width: 100%;
    height: 60px;
    color: #fff;
    border-radius: $px-8 ;
  }
}
</style>
