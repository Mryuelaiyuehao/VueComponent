const baseSize = 75; //设计稿宽度%10 比如 750

// 设置rem 函数
function setRem() {
  //计算出 比例来 当前分辨率的宽%设计稿宽度
  const scale = window.screen.width / 750;
  // 给根元素设置font-size
  document.documentElement.style.fontSize =
    baseSize * Math.min(scale, 2) + "px";
}
setRem();
window.onresize = function () {
  setRem();
};
