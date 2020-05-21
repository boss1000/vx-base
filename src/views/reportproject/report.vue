<template>
  <div id="report" class="commonBase">
    <van-nav-bar left-arrow class="commonTitle" @click-left="onClickLeft" title="一手项目报备" />
    <van-form class="auth-form" @submit="postForm">
      <van-row>
        <van-col span="24">
          提交报备代表您已经阅读并同意
          <span class="redcol" @click="openReport">《联动规则》</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="6">报备项目</van-col>
        <van-col span="18">{{ fromData.title }}</van-col>
      </van-row>
      <van-row>
        <van-col span="6">负责人</van-col>
        <van-col span="16">
          {{fromData.username}} -
          <span
            class="redcol"
            @click="openphone(fromData.userphone)"
          >{{fromData.userphone}}</span>
        </van-col>
      </van-row>
      <van-field
        v-model="fromData.customername"
        name="客户姓名"
        label="客户姓名"
        placeholder="客户姓名"
        :rules="[{ required: true, message: '请填写客户姓名' }]"
      />
      <van-field
        v-model="fromData.customerphone"
        name="客户电话"
        label="客户电话"
        placeholder="客户电话"
        :rules="[{ required: true, validator: phoneValidator, message: validator.phoneMessage }]"
      />
      <van-row class="datetime">
        <van-col span="18">
          <van-field
            readonly
            clickable
            name="datetimePicker"
            :value="fromData.preparietaldate"
            :rules="[{ required: true, message: '请选择预约来访日期' }]"
            label="预约来访日期"
            placeholder="预约来访日期"
            @click="showDate = true"
          />
          <van-calendar v-model="showDate" title="请选择来访日期" @confirm="onConfirm" :round="false" />
        </van-col>
        <van-col span="6">
          <van-field
            readonly
            clickable
            name="datetimePicker"
            :value="fromData.preparietaltime"
            placeholder="时间"
            @click="showPicker = true"
            :rules="[{ required: true, message: '请选择时间' }]"
          />
        </van-col>
      </van-row>
      <van-field
        v-model="fromData.system"
        name="体系"
        label="体系"
        placeholder="请输入体系"
        :rules="[{ required: true, message: '请输入体系' }]"
      />
      <van-field
        v-model="fromData.reportname"
        name="报备人"
        label="报备人"
        placeholder="请输入报备人"
        :rules="[{ required: true, message: '请输入报备人' }]"
      />
      <van-field
        v-model="fromData.reportphone"
        name="报备人电话"
        label="报备人电话"
        placeholder="报备人电话"
        :rules="[{ required: true, validator: phoneValidator, message: validator.phoneMessage }]"
      />
      <van-field
        v-model="fromData.reportname"
        name="所在门店"
        label="所在门店"
        placeholder="请输入所在门店"
        :rules="[{ required: true, message: '请输入所在门店' }]"
      />
      <van-field
        v-model="fromData.reportname"
        name="备注"
        label="备注"
        placeholder="请输入备注"
        :rules="[{ required: true, message: '请输入备注' }]"
      />

      <van-field
        v-model="fromData.reportname"
        name="备注"
        label="备注"
        placeholder="请输入备注"
        :rules="[{ required: true, message: '请输入备注' }]"
      />
      <van-button type="info" block native-type="submit">提交报备</van-button>

      <van-row style="padding-top: 25px;">
        <van-col span="24">
          提交报备代表您已经阅读并同意
          <span class="redcol" @click="openReport">《联动规则》</span>
        </van-col>
      </van-row>
    </van-form>
    <van-popup v-model="showPicker" position="bottom" :style="{ height: '30%' }">
      <van-datetime-picker
        type="time"
        :item-height="80"
        :visible-item-count="10"
        :min-hour="8"
        :max-hour="20"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
    <van-dialog v-model="reportShow" title="联动规则" confirmButtonText="同意" show-cancel-button>
      <linkageRules></linkageRules>
    </van-dialog>
  </div>
</template>

<script type="text/javascript">
import { Dialog } from "vant";
import { validPhone } from "../../utils/validate";
import linkageRules from "../../components/linkageRules";
export default {
  name: "report",
  components: {
    linkageRules
  },
  data() {
    return {
      showDate: false,
      showPicker: false,
      reportShow: false,
      fromData: {
        title: this.$route.params.title || "", // 项目
        username: this.$route.params.username || "", // 负责人
        userphone: this.$route.params.userphone || "", // 负责人电话
        customername: "", // 客户姓名
        customerphone: "", // 客户电话
        preparietaldate: "", // 预约来访日期
        preparietaltime: "", // 预约来访时间
        system: "", // 体系
        reportname: "", // 报备人姓名
        reportphone: "", // 报备人电话
        store: "", // 所在门店
        remark: "" //备注
      },
      validator: {
        phoneMessage: "请输入手机号码"
      }
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
    phoneValidator(value, rule) {
      if (value.length > 0) {
        let isTest = validPhone(value);
        this.validator.phoneMessage = !isTest ? `手机号码错误，请检查` : "";
        return isTest;
      } else {
        this.validator.phoneMessage = `请输入手机号码`;
        return false;
      }
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
#report {
  .datetime {
    &.van-row {
      padding-bottom: 0px;
    }
    /deep/ .van-cell {
      padding-bottom: 24px;
      &.van-field--error {
        padding-bottom: 0px;
      }
    }
    /deep/ .van-col:first-child .van-field__control {
      border-right: none;
    }
  }

  .redcol {
    color: #ff0000;
  }
  .dateChange {
    width: 80%;
    height: 400px;
  }
}
</style>
