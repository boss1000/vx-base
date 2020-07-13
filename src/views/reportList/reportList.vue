<template>
  <div :class="['commonBase', {noData: listData.length == 0}]">
    <van-nav-bar left-arrow class="commonTitle" @click-left="onClickLeft" :title="`${title}的报备`" />
    <div class="mainContent" v-if="listData.length > 0">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="aloneReport" v-for="(item,index) in listData" :key="index">
          <van-row>
            <van-col span="8">报备项目</van-col>
            <van-col span="16">{{ item.ProjectName }}</van-col>
          </van-row>
          <van-row>
            <van-col span="8">负责人</van-col>
            <van-col span="16">
              {{item.PrincipalerName}} -
              <span
                class="redcol"
                @click="openphone(item.PrincipalerMobile)"
              >{{item.PrincipalerMobile}}</span>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="8">客户姓名</van-col>
            <van-col span="16">{{ item.CustomerName }}</van-col>
          </van-row>
          <van-row>
            <van-col span="8">客户电话</van-col>
            <van-col span="16">{{ item.CustomerMobile }}</van-col>
          </van-row>
          <van-row>
            <van-col span="8">预约来访日期</van-col>
            <van-col span="16">{{ item.ArriveDateTime }}</van-col>
          </van-row>
          <van-row>
            <van-col span="8">体系</van-col>
            <van-col span="16">{{ item.CustomerName }}</van-col>
          </van-row>
          <van-row>
            <van-col span="8">报备人</van-col>
            <van-col span="16">{{ item.ReporterName }}</van-col>
          </van-row>
          <van-row>
            <van-col span="8">报备人电话</van-col>
            <van-col span="16">{{ item.ReporterMobile }}</van-col>
          </van-row>
          <van-row>
            <van-col span="8">报备时间</van-col>
            <van-col span="16">{{ item.CreateTime }}</van-col>
          </van-row>
          <van-row>
            <van-col span="8">报备状态</van-col>
            <van-col span="16">{{ item.StatusName }}</van-col>
          </van-row>
          <van-row>
            <van-col span="8">所在门店</van-col>
            <van-col span="16">{{ item.StoreName }}</van-col>
          </van-row>
          <van-row>
            <van-col span="8">备注</van-col>
            <van-col span="16">{{ item.Remark }}</van-col>
          </van-row>
          <van-row type="flex" justify="end">
            <van-button class="buttonRight" type="info" size="small" @click="changeSate(item)">修改状态</van-button>
          </van-row>
        </div>
      </van-list>
    </div>
    <div class="mainContent noData" v-else>暂无报备数据</div>
    <van-popup v-if="destoryPoupState" v-model="showModify" position="bottom" @closed="destoryPoup">
      <van-picker
        :default-index="defaultIndex"
        :columns="hanlersateList"
        show-toolbar
        title="修改状态"
        @cancel="showModify = !showModify"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script type="text/javascript">
import { Dialog } from "vant";
import { GetReportListByUserId, GetReportListByProjectId } from "@/api/report";
import { mapGetters } from "vuex";
export default {
  name: "reportList",
  data() {
    return {
      title: this.$route.params.name || "未知",
      defaultIndex: false,
      destoryPoupState: true,
      defaultIndex: 0,
      listData: [],
      PageIndex: 1,
      PageSize: 10,
      finished: false,
      loading: false
    };
  },
  computed: {
    ...mapGetters(["roles", "sateList"]),
    hanlersateList() {
      let label = [];
      label = this.sateList.map(item => {
        return item.label;
      });
      return label;
    }
  },
  mounted() {
    this.getReport();
  },
  methods: {
    openphone(phone) {
      Dialog.confirm({
        title: "是否拨打电话",
        message: `电话:${phone}`
      })
        .then(() => {
          window.location.href = `tel://${phone}`;
        })
        .catch(() => {
          // on cancel
        });
    },
    onConfirm() {},
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    onLoad() {
      if (!this.finished && this.listData.length > 0) {
        this.loading = true;
        this.PageIndex += 1;
        this.$nextTick(() => {
          this.getReport();
        });
      }
    },
    getReport() {
      if (this.$route.params.id) {
        GetReportListByUserId({ UserId: this.$route.params.id }).then(res => {
          this.listData = res.Result;
          this.finished = true;
        });
      } else {
        GetReportListByProjectId({
          ProjectId: this.$route.params.ProjectId,
          PageIndex: this.PageIndex,
          PageSize: this.PageSize
        }).then(res => {
          this.listData = this.listData.concat(res.Result);
          if (res.Result.length < this.PageSize) {
            this.finished = true;
          }
        });
      }
    },
    changeSate(data) {
      let satevIndex = 0;
      this.destoryPoupState = true;
      this.sateList.find((item, index) => {
        if (item.label == data.StatusName) {
          satevIndex = index;
        }
      });
      this.defaultIndex = satevIndex;
      this.$nextTick(() => {
        this.showModify = true;
      });
    },
    destoryPoup() {
      this.destoryPoupState = false;
    }
  }
};
</script>
<style lang="less" scoped>
.commonBase {
  &.noData {
    background-color: #fff;
  }
}
.mainContent {
  flex-grow: 1;
  &.noData {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }
}
.aloneReport {
  padding: 15px;
  background-color: #fff;
  margin-bottom: 20px;
  /deep/ .van-row {
    padding-bottom: 10px;
  }
  .redcol {
    color: #ff0000;
  }
}
</style>
