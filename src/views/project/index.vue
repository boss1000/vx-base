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
    <van-list
      class="mainContent"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <infoview :infoList="infoList"></infoview>
    </van-list>
  </div>
</template>
<script>
import infoview from "./components/infoview";
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
          id: 1,
          image: "https://img.yzcdn.cn/vant/apple-1.jpg",
          title: "万科新都会",
          reportnum: "5123",
          username: "林海静",
          userphone: "13698761234",
          discount:
            "首付90w96折,全款94折,首付90w96折,全款94折,首付90w96折,全款94折,首付90w96折,全款94折",
          developers: "万科",
          openquotation: "最新2020年8月20",
          commission: "120m²以上30000,120m²以下0.9%",
          notice:
            "万科新都会，3室2厅2卫，好楼层，阳光无遮挡.高品质小区，环境优美，物业管理好。楼层也好，采光无遮.万科新都会，3室2厅2卫，好楼层，阳光无遮挡.高品质小区，环境优美，物业管理好。楼层也好，采光无遮.万科新都会，3室2厅2卫，好楼层，阳光无遮挡.高品质小区，环境优美，物业管理好。楼层也好，采光无遮.万科新都会，3室2厅2卫，好楼层，阳光无遮挡.高品质小区，环境优美，物业管理好。楼层也好，采光无遮.万科新都会，3室2厅2卫，好楼层，阳光无遮挡.高品质小区，环境优美，物业管理好。楼层也好，采光无遮."
        },
        {
          id: 2,
          image: "https://img.yzcdn.cn/vant/apple-1.jpg",
          title: "万科新都会",
          reportnum: "5123",
          username: "林海静",
          userphone: "13698761234",
          discount:
            "首付90w96折,全款94折,首付90w96折,全款94折,首付90w96折,全款94折,首付90w96折,全款94折",
          developers: "万科",
          openquotation: "最新2020年8月20",
          commission: "120m²以上30000,120m²以下0.9%",
          notice:
            "万科新都会，3室2厅2卫，好楼层，阳光无遮挡.高品质小区，环境优美，物业管理好。楼层也好，采光无遮."
        }
      ]
    };
  },
  methods: {
    onSearch() {},
    onLoad() {
      // this.infoList = this.infoList.concat([

      // ]);
      // // 加载状态结束
      this.loading = false;

      // // 数据全部加载完成
      // if (this.infoList.length == 4) {
      //   this.finished = true;
      // }
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