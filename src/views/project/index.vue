<template>
  <div>
    <form action="javascript:return true">
      <van-search v-model="searchData.ProjectName" placeholder="请输入搜索关键词" @blur="getDataList()"></van-search>
    </form>
    <van-dropdown-menu>
      <van-dropdown-item
        v-model="searchData.Area"
        :options="areaList"
        title="地区"
        @change="getDataList()"
      />
      <van-dropdown-item
        v-model="searchData.orderType"
        :options="option2"
        title="排序"
        @change="getDataList()"
      />
    </van-dropdown-menu>
    <van-list
      class="mainContent"
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <infoview :infoList="infoList" @openChange="openChange"></infoview>
    </van-list>
    <cahangeData :projectId="projectId" :areaList="areaList" :dialogFormVisible.sync="dialogFormVisible" @getDataList="getDataList"></cahangeData>
  </div>
</template>
<script>
import infoview from "./components/infoview";
import cahangeData from "./components/cahangeData";
import { getProjectList, GetAreaList } from "@/api/project";
export default {
  components: { infoview, cahangeData },
  data() {
    return {
      searchData: {
        ProjectName: "",
        Area: "",
        orderType: 1,
        PageIndex: 1,
        PageSize: 10
      },
      loading: false,
      finished: false,
      areaList: [],
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
      infoList: [],
      projectId: 0,
      dialogFormVisible: false
    };
  },
  mounted() {
    this.getDataList();
    this.getAreaList();
  },
  methods: {
    onLoad() {
      if (!this.finished) {
        this.loading = true;
        this.searchData.PageIndex += 1;
        this.$nextTick(() => {
          this.getDataList(true);
        });
      }
    },
    getAreaList() {
      GetAreaList().then(data => {
        this.areaList = data.Result;
      });
    },
    getDataList(isPage) {
      if (!isPage) {
        // 判断是否为翻页
        this.infoList = [];
        this.searchData.PageIndex = 1;
      }
      this.$nextTick(() => {
        getProjectList(this.searchData)
          .then(data => {
            this.infoList = this.infoList.concat(data.Result);
            this.loading = false;
            if (data.Result.length < this.searchData.PageSize) {
              this.finished = true;
            }
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    openChange(data) {
      this.projectId = data.projectId;
      this.$nextTick(() => {
        this.dialogFormVisible = true;
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>