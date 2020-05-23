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
        v-model="searchData.accountsate"
        :options="option1"
        title="账号状态"
        @change="changeDropdown"
      />
    </van-dropdown-menu>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <accountView class="mainContent" :accountList="accountList"></accountView>
    </van-list>
  </div>
</template>
<script>
import accountView from "./components/accountView";
export default {
  components: { accountView },
  data() {
    return {
      searchData: {
        searchlabel: "",
        accountsate: ""
      },
      loading: false,
      finished: false,
      option1: [
        { text: "启用", value: 1 },
        { text: "停用", value: 0 }
      ],
      accountList: [
        {
          account: "13798761234",
          name: "来建平",
          system: "传成",
          state: '1',
          project: ["大都会", "富力城"]
        }
      ]
    };
  },
  methods: {
    onSearch() {},
    onLoad() {
      // this.buildList = this.buildList.concat([
      //   {
      //     name: "新鹿城2121",
      //     size: "102-140",
      //     address: "路程区牛山北路（百里亭公交站）",
      //     price: "240",
      //     image: "https://img.yzcdn.cn/vant/apple-1.jpg"
      //   }
      // ]);
      // 加载状态结束
      this.loading = false;
      this.finished = true;
      // 数据全部加载完成
      // if (this.buildList.length == 4) {
      //   this.finished = true;
      // }
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