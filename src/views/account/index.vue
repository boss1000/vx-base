<template>
  <div>
    <van-search v-model="searchData.Q" show-action placeholder="请输入搜索关键词">
      <template #action>
        <van-button class="searchBoxbutton" size="small" hairline type="info" @click="onSearch">搜索</van-button>
        <van-button
          v-if="roles == '1'"
          class="searchBoxbutton"
          size="small"
          hairline
          type="info"
          @click="accountAdd"
        >新增</van-button>
      </template>
    </van-search>

    <showLoading :showLoading="showLoading"></showLoading>

    <van-dropdown-menu>
      <van-dropdown-item
        v-model="searchData.Status"
        :options="option1"
        title="账号状态"
        @change="changeDropdown"
      />
    </van-dropdown-menu>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <accountView class="mainContent" :accountList="accountList" @onSearch="onSearch"></accountView>
    </van-list>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import accountView from "./components/accountView";
import showLoading from "@/components/showLoading";
import { GetAccountList } from "@/api/account";
export default {
  components: { accountView, showLoading },
  data() {
    return {
      showLoading: false,
      searchData: {
        Q: "",
        Status: 0
      },
      loading: false,
      finished: false,
      option1: [
        { text: "全部", value: 0 },
        { text: "启用", value: 1 },
        { text: "停用", value: 2 }
      ],
      accountList: []
    };
  },
  computed: {
    ...mapGetters(["roles"])
  },
  mounted() {
    this.onSearch();
  },
  methods: {
    onSearch() {
      this.showLoading = true;
      GetAccountList(this.searchData).then(res => {
        this.showLoading = false;
        this.accountList = res.Result;
      });
    },
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
    accountAdd() {
      this.$router.push({
        name: "accountAdd",
        params: {}
      });
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
</style>