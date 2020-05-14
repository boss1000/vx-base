<template>
  <van-swipe class="commswipe" :autoplay="3000">
    <van-swipe-item v-for="(image, index) in images" :key="index">
      <img v-lazy="image" />
    </van-swipe-item>
  </van-swipe>
</template>
<script>
export default {
  name: "headerSwipe",
  data() {
    return {
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.commswipe {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  img {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 240px;
    padding: 30px 60px;
    background-color: #fff;
    pointer-events: none;
  }
}
</style>