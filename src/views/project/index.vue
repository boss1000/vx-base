<template>
  <div>
    <van-search v-model="searchData.searchlabel" placeholder="请输入搜索关键词" @search="onSearch" />
    <van-dropdown-menu>
      <van-dropdown-item
        v-model="searchData.region"
        :options="option1"
        title="地区"
        @change="changeDropdown"
      />
      <van-dropdown-item
        v-model="searchData.type"
        :options="option1"
        title="类型"
        @change="changeDropdown"
      />
      <van-dropdown-item
        v-model="searchData.price"
        :options="option1"
        title="价格"
        @change="changeDropdown"
      />
    </van-dropdown-menu>
    <van-list class="mainContent" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <infoview :infoList="infoList"></infoview>
    </van-list>
  </div>
</template>
<script>
import infoview from "../../components/infoview";
export default {
  components: { infoview },
  data() {
    return {
      searchData: {
        searchlabel: "",
        region: "",
        type: "",
        price: ""
      },
      loading: false,
      finished: false,
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 },
        { text: "全部商品", value: 3 },
        { text: "新款商品", value: 4 }
      ],
      infoList: [
        {
          title:
            "万科新都会，3室2厅2卫，好楼层，阳光无遮挡.高品质小区，环境优美，物业管理好。楼层也好，采光无遮.",
          time: "2020-5-2",
          image: "https://img.yzcdn.cn/vant/apple-1.jpg"
        },
        {
          title:
            "万科新都会，3室2厅2卫，好楼层，阳光无遮挡.高品质小区，环境优美，物业管理好。楼层也好，采光无遮.",
          time: "2020-5-2",
          image: "https://img.yzcdn.cn/vant/apple-1.jpg"
        }
      ]
    };
  },
  methods: {
    onSearch() {},
    onLoad() {
      this.infoList = this.infoList.concat([
        {
          title:
            "万科新都会，3室2厅2卫，好楼层，阳光无遮挡.高品质小区，环境优美，物业管理好。楼层也好，采光无遮.",
          time: "2020-5-2",
          image: "https://img.yzcdn.cn/vant/apple-1.jpg"
        }
      ]);
      // 加载状态结束
      this.loading = false;

      // 数据全部加载完成
      if (this.infoList.length == 4) {
        this.finished = true;
      }
    },
    changeDropdown() {}
  }
};
</script>
<style lang="less" scoped>
.mainContent {
  margin: 0 15px;
}
</style>