<template>
  <div class="mainContent">
    <div class="searchForm" v-if="roles !== '3'">
      <van-cell-group>
        <van-field-select-picker
          label="状态"
          placeholder="请选择"
          v-model="satelabel"
          :columns="hanlersateList"
        />
        <van-field v-model="searchForm.Q" label="搜索关键词" placeholder="多个关键字之间用空格隔开" />
        <van-row>
          <van-col span="14">
            <van-field
              :value="searchForm.DateBegin"
              label="报备日期"
              placeholder="开始"
              @click="timeStart = true"
            />
            <van-calendar v-model="timeStart" title="开始" @confirm="onConfirmStart" />
          </van-col>
          <van-col span="2" class="spiltRow">-</van-col>
          <van-col span="8">
            <van-field :value="searchForm.DateEnd" placeholder="截至" @click="timeEnd = true" />
            <van-calendar v-model="timeEnd" title="截至" @confirm="onConfirmEnd" />
          </van-col>
        </van-row>
      </van-cell-group>

      <van-row class="controlBox">
        <van-button class="buttonRight" type="info" size="small" @click="getReport">查询</van-button>
      </van-row>
    </div>

    <showLoading :showLoading="showLoading"></showLoading>

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <locationView :locationList="locationList" :sateList="sateList"></locationView>
    </van-list>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { Toast } from "vant";
import { GetReportList, GetReportListByUserId } from "@/api/report";
import showLoading from "@/components/showLoading";
import VanFieldSelectPicker from "@/components/VanFieldSelectPicker";
import locationView from "./components/locationView";
export default {
  name: "location",
  components: {
    VanFieldSelectPicker,
    showLoading,
    locationView
  },
  data() {
    return {
      showLoading: false,
      satelabel: "请选择",
      timeStart: false,
      timeEnd: false,
      finished: false,
      loading: false,
      searchForm: {
        Status: null,
        Q: "",
        DateBegin: "",
        DateEnd: ""
      },
      sateList: [
        {
          value: null,
          label: "请选择"
        },
        {
          value: 1,
          label: "界定中"
        },
        {
          value: 2,
          label: "有效推荐"
        },
        {
          value: 3,
          label: "无效推荐"
        },
        {
          value: 4,
          label: "有效带看"
        },
        {
          value: 5,
          label: "有效到访"
        },
        {
          value: 6,
          label: "认筹"
        },
        {
          value: 7,
          label: "认购"
        },
        {
          value: 8,
          label: "成交"
        }
      ],
      locationList: []
    };
  },
  computed: {
    ...mapGetters(["roles"]),
    hanlersateList() {
      let label = [];
      label = this.sateList.map(item => {
        return item.label;
      });
      return label;
    }
  },
  watch: {
    satelabel() {
      this.searchForm.Status = this.sateList.find(
        item => item.label == this.satelabel
      ).value;
    }
  },
  mounted() {
    // console.log(this.roles);
  },
  methods: {
    onConfirmStart(value) {
      this.searchForm.DateBegin = value;
      this.timeStart = false;
    },
    onConfirmEnd(value) {
      this.searchForm.DateEnd = value;
      this.timeEnd = false;
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
    getReport() {
      if (this.searchForm.Status !== null) {
        this.showLoading = true;
        GetReportList(this.searchForm).then(res => {
          this.locationList = res.Result;
          this.showLoading = false;
        });
      } else {
        Toast("请选择报备数据");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.searchForm {
  padding: 18px 0;
  .spiltRow {
    text-align: center;
    line-height: 28px;
  }
}
</style>