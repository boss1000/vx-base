<template>
  <div class="infoPreview">
    <div
      v-for="(item,index) in accountList"
      :key="index"
      :class="['infoBox', (index + 1 !== accountList.length ) ? 'van-hairline--bottom' : '']"
    >
      <div class="buildContent">
        <div class="contentBox">
          <van-row class="halfBorder">
            <van-col class="name" span="5">账号</van-col>
            <van-col
              class="content phone"
              span="7"
              @click="openphone(item.account)"
            >{{item.account}}</van-col>
            <van-col class="name" span="5">姓名</van-col>
            <van-col class="content" span="7">{{item.name}}</van-col>
          </van-row>
          <van-row class="halfBorder">
            <van-col class="name" span="5">体系</van-col>
            <van-col class="content" span="7">{{item.system}}</van-col>
            <van-col class="name" span="5">状态</van-col>
            <van-col class="content" span="7">{{ item.state == '1' ? '启用' : '停用'}}</van-col>
          </van-row>
          <van-row class="halfBorder">
            <van-col class="name" span="5">负责项目</van-col>
            <van-col class="content" span="19">
              <div v-for="(allproject,index) in item.project" :key="index">{{allproject}}</div>
            </van-col>
          </van-row>
          <van-row class="controlBox" type="flex" justify="end">
            <van-button
              class="buttonRight"
              type="danger"
              size="small"
              @click="openReport(item)"
            >重置密码</van-button>
            <van-button class="buttonRight" type="info" size="small" @click="openReport(item)">修改</van-button>
            <van-button type="info" size="small" @click="opendetail(item)">数据</van-button>
          </van-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
export default {
  name: "accountList",
  props: {
    accountList: {
      type: Array,
      default: []
    }
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
    opendetail(item) {
      this.$router.push({
        name: "projectdetail",
        params: {
          id: this.currReport.id,
          title: this.currReport.title,
          username: this.currReport.username,
          userphone: this.currReport.userphone
        }
      });
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
    background: #fff;
    // border: solid 1px #ccc;
    .imageSize {
      width: 90px;
      height: 90px;
    }
    .buildContent {
      flex-grow: 1;
      border: 1px solid rgba(0, 0, 0, 0.2);
      .contentBox {
        display: flex;
        flex-direction: column;
        // margin-left: 15px;
        font-size: 14px;
        // margin-bottom: 10px;
        /deep/.van-row {
          &.halfBorder {
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
            .van-col {
              padding: 5px 0;
              border-left: 1px solid rgba(0, 0, 0, 0.2);
            }
            .van-col:first-child {
              border-left: none;
            }
          }
          &.controlBox {
            padding: 5px 10px;
          }
        }
        .name {
          color: #908585;
          font-size: 14px;
          line-height: 20px;
          text-indent: 5px;
        }
        .content {
          font-size: 14px;
          line-height: 20px;
          text-indent: 5px;
          // margin-top: 10px;
        }
        .phone {
          color: #ff0000;
        }
      }
      .buttonRight {
        margin-right: 10px;
      }
    }
  }
  .reprotSet {
    width: 80%;
    height: 80%;
  }
}
</style>