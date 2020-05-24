<template>
  <div id="report" class="commonBase">
    <van-nav-bar left-arrow class="commonTitle" @click-left="onClickLeft" title="账号新增" />
    <van-form class="auth-form columnSpace" @submit="postForm">
      <div>
        <van-field
          v-model="fromData.useraccount"
          name="账号"
          label="账号"
          :placeholder="validator.phoneMessage"
          :rules="[{validator: phoneValidator, message: validator.phoneMessage }]"
        />
        <van-field
          v-model="fromData.username"
          name="姓名"
          label="姓名"
          :placeholder="validator.phoneMessage"
          :rules="[{ required: true, message: '请填写账号' }]"
        />
        <van-field
          v-model="fromData.useridcard"
          name="身份证号码"
          label="身份证号码"
          :placeholder="validator.cardMessage"
          :rules="[{ validator: cardValidator, message: validator.cardMessage }]"
        />
        <van-field
          v-model="fromData.userstore"
          name="门店"
          label="门店"
          placeholder="请输入门店"
          :rules="[{ required: true, message: '请输入门店' }]"
        />
        <van-field
          v-model="fromData.usersystem"
          name="体系"
          label="体系"
          placeholder="请输入所属体系"
          :rules="[{ required: true, message: '请输入所属体系' }]"
        />
      </div>
      <van-button type="info" block native-type="submit">确认新增</van-button>
    </van-form>
  </div>
</template>

<script type="text/javascript">
import { Dialog } from "vant";
import { validPhone, IdCardValidate } from "../../../utils/validate";
export default {
  name: "report",
  data() {
    return {
      showDate: false,
      showPicker: false,
      reportShow: false,
      fromData: {
        useraccount: "", // 账号
        username: "", // 姓名
        useridcard: "", // 身份证号码
        userstore: "", // 门店
        usersystem: "" // 体系
      },
      validator: {
        phoneMessage: "请输入手机号码",
        cardMessage: "请输入身份证号"
      }
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
    cardValidator(value, rule) {
      if (value.length > 0) {
        let isTest = IdCardValidate(value);
        this.validator.cardMessage = !isTest ? "请检查身份证号码" : "";
        return isTest;
      } else {
        this.validator.cardMessage = "请输入身份证号码";
        return false;
      }
    },
    postForm() {
      console.log(123);
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
      padding-bottom: 18px;
      &.van-field--error {
        // padding-bottom: 0px;
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
