<template>
  <div class="infoPreview">
    <div
      v-for="(item,index) in infoList"
      :key="index"
      :class="['infoBox', (index + 1 !== infoList.length ) ? 'van-hairline--bottom' : '']"
    >
      <van-image class="imageSize" fit="contain" lazy-load :src="item.image" />
      <div class="buildContent">
        <div class="contentBox">
          <van-row>
            <van-col class="title" span="12">{{item.title}}</van-col>
          </van-row>
          <van-row>
            <van-col class="name" span="8">报备数</van-col>
            <van-col class="content" span="16">{{item.reportnum}}</van-col>
          </van-row>
          <van-row>
            <van-col class="name" span="8">负责人</van-col>
            <van-col class="content" span="16">
              {{item.username}} -
              <span
                class="phone"
                @click="openphone(item.userphone)"
              >{{item.userphone}}</span>
            </van-col>
          </van-row>
          <van-row>
            <van-col class="name" span="8">折扣</van-col>
            <van-col class="content" span="16">{{item.discount}}</van-col>
          </van-row>
          <van-row>
            <van-col class="name" span="8">开发商</van-col>
            <van-col class="content" span="16">{{item.developers}}</van-col>
          </van-row>
          <van-row>
            <van-col class="name" span="8">开盘时间</van-col>
            <van-col class="content" span="16">{{item.openquotation}}</van-col>
          </van-row>
          <van-row>
            <van-col class="name" span="8">佣金</van-col>
            <van-col class="content" span="16">{{item.commission}}</van-col>
          </van-row>
          <van-row>
            <van-col class="name" span="8">特别说明</van-col>
            <van-col class="content" span="16">{{item.notice}}</van-col>
          </van-row>
          <van-row>
            <van-button class="buttonRight" type="info" size="small" @click="openReport(item)">报备</van-button>
            <van-button type="info" size="small">详情</van-button>
          </van-row>
        </div>
      </div>
    </div>
    <van-dialog
      v-model="reportShow"
      title="联动规则"
      confirmButtonText="同意"
      @confirm="agreeReportShow"
      show-cancel-button
    >
      <linkageRules></linkageRules>
    </van-dialog>
  </div>
</template>
<script>
import { Dialog } from "vant";
import linkageRules from "../../../components/linkageRules";
export default {
  name: "infoview",
  props: {
    infoList: {
      type: Array,
      default: []
    }
  },
  components: {
    linkageRules
  },
  data() {
    return {
      reportShow: false,
      currReport: {}
    };
  },
  mounted() {},
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
    openReport(item) {
      this.currReport = item;
      this.reportShow = true;
    },
    agreeReportShow() {
      this.$router.push({
        name: "report",
        params: {
          id: this.currReport.id,
          title: this.currReport.title,
          username: this.currReport.username,
          userphone: this.currReport.userphone
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.infoPreview {
  .infoBox {
    display: flex;
    flex-direction: row;
    padding-bottom: 10px;
    margin-top: 10px;
    // border-bottom: solid 1px #ccc;
    .imageSize {
      width: 280px;
      height: 90px;
    }
    .buildContent {
      flex-grow: 1;
      .contentBox {
        display: flex;
        flex-direction: column;
        margin-left: 15px;
        font-size: 14px;
        /deep/.van-row {
          margin-bottom: 10px;
        }
        .title {
          font-size: 16px;
          font-weight: bold;
        }
        .name {
          color: #908585;
        }
        .content {
          // margin-top: 10px;
        }
        .phone {
          color: #ff0000;
        }
        .buttonRight {
          margin-right: 15px;
        }
      }
    }
  }
  .reprotSet {
    width: 80%;
    height: 80%;
  }
}
</style>