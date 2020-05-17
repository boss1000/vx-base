<template>
  <div class="infoPreview">
    <div
      v-for="(item,index) in infoList"
      :key="index"
      :class="['infoBox', (index + 1 !== infoList.length ) ? 'van-hairline--bottom' : '']"
    >
      <van-image class="imageSize" fit="contain" lazy-load :src="item.image" />
      <div class="buildContent">
        <div class="contentBox">
          <span class="name">{{item.title}}</span>
          <span class="time">{{item.time}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "infoview",
  props: {
    infoList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.infoPreview {
  .infoBox {
    display: flex;
    flex-direction: row;
    padding-bottom: 10px;
    margin-top: 10px;
    // border-bottom: solid 1px #ccc;
    .imageSize {
      width: 600px;
      height: 80px;
    }
    .buildContent {
      flex-grow: 1;
      .contentBox {
        display: flex;
        flex-direction: column;
        margin-left: 15px;
        .name {
          font-size: 12px;
        }
        .time {
          margin-top: 10px;
          font-size: 12px;
          color: #908585;
        }
      }
    }
  }
}
</style>