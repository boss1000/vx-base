<template>
  <div>
    <van-search v-model="searchData.ProjectName" placeholder="请输入搜索关键词" @search="changeDropdown"></van-search>
    <van-dropdown-menu>
      <van-dropdown-item
        v-model="searchData.Area"
        :options="option1"
        title="地区"
        @change="changeDropdown"
      />
      <van-dropdown-item
        v-model="searchData.orderType"
        :options="option2"
        title="类型"
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
import { getProjectList, GetAreaList } from "@/api/project";
export default {
  components: { infoview },
  data() {
    return {
      searchData: {
        ProjectName: "",
        Area: "",
        orderType: 1
      },
      loading: false,
      finished: false,
      option1: [],
      option2: [
        {
          text: "默认",
          value: 1
        },
        {
          text: "日期排序",
          value: 2
        },
        {
          text: "热度",
          value: 3
        }
      ],
      infoList: []
    };
  },
  mounted() {
    this.changeDropdown();
    this.getAreaList();
  },
  methods: {
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
    getAreaList() {
      GetAreaList().then(data => {
        this.option1 = data.Result;
      });
    },
    changeDropdown() {
      getProjectList(this.searchData)
        .then(data => {
          this.infoList = data.Result;
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="less" scoped>
</style>