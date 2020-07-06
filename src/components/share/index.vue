<template>
  <div>
    <van-button type="info" icon="star-o" class="shareInfo" @click="showShare=true" />

    <van-popup v-model="showShare" :get-container="getContainer" class="popup" @touchmove.prevent>
      <div class="popupBackground">
        <div class="image"></div>
        <div class="projectName">1223</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showShare: false
    };
  },
  methods: {
    getContainer() {
      return document.querySelector(".commonBase");
    }
  }
};
</script>

<style lang="scss" scoped>
.shareInfo {
  position: fixed;
  right: 10px;
  top: 80px;
  opacity: 0.8;
}
.popupBackground {
  position: relative;
  width: 300px;
  height: 500px;
  background-image: url("../../assets/images/share.jpg");
  background-size: 100% 100%;
  .image {
    position: absolute;
    width: 241.5px;
    height: 145px;
    top: 150px;
    left: 29.5px;
    background: #ccc;
  }
  .projectName {
    position: absolute;
    width: 241.5px;
    height: 23.5px;
    line-height: 23.5px;
    top: 295px;
    left: 29.5px;
    font-family: pingFang;
    color: #fff;
    text-align: center;
    font-size: 20px;
  }
}
</style>
