<template>
  <div class="commonBase">
    <van-nav-bar left-arrow class="commonTitle" @click-left="onClickLeft" :title="`${title}的报备`" />
    <div class="mainContent">
      <div class="aloneReport" v-for="(item,index) in listData" :key="index">
        <van-row>
          <van-col span="8">报备项目</van-col>
          <van-col span="16">{{ item.title }}</van-col>
        </van-row>
        <van-row>
          <van-col span="8">负责人</van-col>
          <van-col span="16">
            {{item.username}} -
            <span
              class="redcol"
              @click="openphone(item.userphone)"
            >{{item.userphone}}</span>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="8">客户姓名</van-col>
          <van-col span="16">{{ item.customername }}</van-col>
        </van-row>
        <van-row>
          <van-col span="8">客户电话</van-col>
          <van-col span="16">{{ item.customerphone }}</van-col>
        </van-row>
        <van-row>
          <van-col span="8">预约来访日期</van-col>
          <van-col span="16">{{ item.preparietaldate }} {{item.preparietaltime}}</van-col>
        </van-row>
        <van-row>
          <van-col span="8">体系</van-col>
          <van-col span="16">{{ item.system }}</van-col>
        </van-row>
        <van-row>
          <van-col span="8">报备人</van-col>
          <van-col span="16">{{ item.reportname }}</van-col>
        </van-row>
        <van-row>
          <van-col span="8">报备人电话</van-col>
          <van-col span="16">{{ item.reportphone }}</van-col>
        </van-row>
        <van-row>
          <van-col span="8">所在门店</van-col>
          <van-col span="16">{{ item.store }}</van-col>
        </van-row>
        <van-row>
          <van-col span="8">备注</van-col>
          <van-col span="16">{{ item.remark }}</van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { Dialog } from "vant";
export default {
  name: "accountReport",
  data() {
    return {
      showDate: false,
      showPicker: false,
      reportShow: false,
      title: this.$route.params.name || '未知',
      listData: [
        {
          title: "测试", // 项目
          username: "来建平" || "", // 负责人
          userphone: "13596328547", // 负责人电话
          customername: "哇哈哈", // 客户姓名
          customerphone: "13596328547", // 客户电话
          preparietaldate: "2019-2-4", // 预约来访日期
          preparietaltime: "8:00", // 预约来访时间
          system: "测试", // 体系
          reportname: "123", // 报备人姓名
          reportphone: "13596328547", // 报备人电话
          store: "dsaa", // 所在门店
          remark: "12312312" //备注
        },
        {
          title: "测试", // 项目
          username: "来建平" || "", // 负责人
          userphone: "13596328547", // 负责人电话
          customername: "哇哈哈", // 客户姓名
          customerphone: "13596328547", // 客户电话
          preparietaldate: "2019-2-4", // 预约来访日期
          preparietaltime: "8:00", // 预约来访时间
          system: "测试", // 体系
          reportname: "123", // 报备人姓名
          reportphone: "13596328547", // 报备人电话
          store: "dsaa", // 所在门店
          remark: "12312312" //备注
        }
      ]
    };
  },
  mounted() {
    console.log(this.$route.params);
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
    postForm() {
      console.log(123);
    },
    openReport(item) {
      this.reportShow = true;
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
}
</style>
