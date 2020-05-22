<template>
  <div>
    <van-search v-model="searchData.searchlabel" show-action placeholder="请输入搜索关键词">
      <template #action>
        <!-- <span @click="onSearch">搜索</span> -->
        <van-button class="searchBoxbutton" size="small" hairline type="info">搜索</van-button>
        <!-- <span @click="onSearch">添加</span> -->
        <van-button class="searchBoxbutton" size="small" hairline type="info">添加</van-button>
      </template>
    </van-search>

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
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <buildPreview class="mainContent" :buildList="buildList" :showTag="false"></buildPreview>
    </van-list>
  </div>
</template>
<script>
import buildPreview from "../../components/buildPreview";
export default {
  components: { buildPreview },
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
      buildList: [
        {
          name: "新鹿城",
          size: "102-140",
          tag: ["瓯海第一盘", "瓯海第一盘"],
          address: "路程区牛山北路（百里亭公交站）",
          price: "240",
          image: "https://img.yzcdn.cn/vant/apple-1.jpg"
        },
        {
          name: "新鹿城",
          size: "102-140",
          tag: ["瓯海第一盘"],
          address: "路程区牛山北路（百里亭公交站）",
          price: "240",
          image: "https://img.yzcdn.cn/vant/apple-1.jpg"
        },
        {
          name: "新鹿城",
          size: "102-140",
          address: "路程区牛山北路（百里亭公交站）",
          price: "240",
          image: "https://img.yzcdn.cn/vant/apple-1.jpg"
        }
      ]
    };
  },
  methods: {
    onSearch() {},
    onLoad() {
      this.buildList = this.buildList.concat([
        {
          name: "新鹿城2121",
          size: "102-140",
          address: "路程区牛山北路（百里亭公交站）",
          price: "240",
          image: "https://img.yzcdn.cn/vant/apple-1.jpg"
        }
      ]);
      // 加载状态结束
      this.loading = false;

      // 数据全部加载完成
      if (this.buildList.length == 4) {
        this.finished = true;
      }
    },
    changeDropdown() {}
  }
};
</script>
<style lang="less" scoped>
.searchBoxbutton {
  min-width: 32px;
  margin-right: 5px;
}
.searchBoxbutton:last-child {
  margin-right: 0px;
}
.mainContent {
  margin: 0 15px;
}
</style>