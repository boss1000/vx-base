<template>
  <div class="commonBase">
    <van-nav-bar left-arrow class="commonTitle" @click-left="onClickLeft" :title="`${title}的报备`" />
    <div class="mainContent">
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
          <van-col span="8">所在门店</van-col>
          <van-col span="16">{{ item.StoreName }}</van-col>
        </van-row>
        <van-row>
          <van-col span="8">备注</van-col>
          <van-col span="16">{{ item.Remark }}</van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { Dialog } from "vant";
import { GetReportListByUserId } from "@/api/report";
export default {
  name: "accountReport",
  data() {
    return {
      title: this.$route.params.name || "未知",
      listData: []
    };
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
    getReport() {
      GetReportListByUserId({ UserId: this.$route.params.id }).then(res => {
        this.listData = res.Result;
      });
    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    }
  }
};
</script>
<style lang="less" scoped>
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
