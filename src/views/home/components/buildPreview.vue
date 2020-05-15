<template>
  <div class="buildPreview">
    <div v-for="(item,index) in buildList" :key="index">
      <van-image class="imageSize" fit="contain" lazy-load :src="item.image" />
      <div class="buildContent">
        <div class="contentBox">
          <span class="name">{{item.name}}</span>
          <span class="size">{{item.size}}㎡</span>
        </div>
        <div class="contentBox">
          <span class="address">{{item.address}}</span>
          <span class="price">{{item.price}}万起</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "buildPreview",
  props: {
    buildList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      setBuildList: []
    };
  },
  mounted() {
    // this.setBuildList = this.buildList.map(item => {
    //   item.image = require(item.image)
    //   return item
    // })
    // console.log(this.setBuildList)
  }
};
</script>
<style lang="less" scoped>
.buildPreview {
  .imageSize {
    width: 100%;
    height: 150px;
  }
  .buildContent {
    .contentBox {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      vertical-align: bottom;
      .name {
        font-size: 18px;
      }
      .size {
        font-size: 14px;
        color: #908585;
      }
      .address {
        // line-height: 80px;
        margin-top: 6px;
      }
      .price {
        font-size: 18px;
        color: #1296db;
      }
    }
  }
}
</style>