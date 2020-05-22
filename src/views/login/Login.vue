<template>
  <div id="login">
    <van-nav-bar class="commonTitle" title="登陆" />
    <div class="loginBox">
      <div class="auth-form">
        <van-tabs v-model="active">
          <van-tab :title="loginPage.title">
            <!-- 账号密码登录 -->
            <van-form validate-first @submit="loginForm">
              <van-cell-group>
                <van-field
                  v-model="loginData.userName"
                  label="账号"
                  maxlength="11"
                  placeholder="请输入账号"
                  :rules="[{ validator: phoneValidator, message: validator.phoneMessage }]"
                />
                <van-field
                  v-model="loginData.password"
                  type="password"
                  label="密码"
                  placeholder="请输入密码"
                  :rules="[{ validator: passValidator, message: validator.passeMessage }]"
                />
              </van-cell-group>
              <van-button type="info" size="large" style="margin-top:1rem" native-type="submit">登录</van-button>
            </van-form>
          </van-tab>
          <!-- 注册 -->
          <van-tab :title="loginPage.resgin">
            <van-form validate-first @submit="registerForm">
              <van-cell-group>
                <van-field
                  v-model="register.phone"
                  maxlength="11"
                  label="手机号"
                  type="number"
                  placeholder="请输入手机号"
                  :rules="[{ validator: phoneValidator, message: validator.phoneMessage }]"
                >
                  <van-button
                    slot="button"
                    size="small"
                    type="primary"
                    v-if="!countDown"
                    native-type="button"
                    @click="sendVerifyCode"
                  >发送验证码</van-button>
                  <van-button
                    slot="button"
                    size="small"
                    type="primary"
                    disabled
                    v-model="smsCaptcha"
                    v-else
                  >已发送{{countDown}}s</van-button>
                </van-field>
                <van-field
                  v-model="register.verification"
                  type="text"
                  label="验证码"
                  placeholder="请输入验证码"
                  :rules="[{ required: true, message: '请输入验证码' }]"
                />
                <van-field
                  v-model="register.name"
                  type="text"
                  label="姓名"
                  placeholder="请输入姓名"
                  :rules="[{ required: true, message: '请输入姓名' }]"
                />
                <van-field
                  v-model="register.store"
                  type="text"
                  label="门店"
                  placeholder="请输入门店"
                  :rules="[{ required: true, message: '请输入门店' }]"
                />
                <van-field
                  v-model="register.idcard"
                  type="text"
                  label="身份证"
                  placeholder="请输入身份证号码"
                  :rules="[{ validator: cardValidator, message: validator.cardMessage }]"
                />
                <van-field
                  v-model="register.passwrod"
                  type="text"
                  label="登录密码"
                  placeholder="请输入密码"
                />
              </van-cell-group>
              <van-button type="info" size="large" style="margin-top:1rem" native-type="submit">注册</van-button>
            </van-form>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
// 引入Vant的组件
import { Toast, Dialog } from "vant";
import { IdCardValidate } from "../../utils/validate";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      countDown: 0, // 倒计时
      active: 0,
      loginPage: {
        title: "登录",
        resgin: "注册"
      },
      validator: {
        phoneMessage: "",
        passeMessage: "请输入密码",
        cardMessage: ""
      },
      loginData: {
        userName: "", // 用户名
        password: "" // 用户密码
      },
      register: {
        phone: "", // 手机号
        verification: "", // 验证码
        name: "", // 用户名
        store: "", // 门店
        idcard: "", // 身份证
        passwrod: "" // 密码
      },
      imgCaptcha: "", // 图片验证码
      smsCaptcha: "", // 短信验证码
      isShowSMSLogin: true, // 是否短信登录
      smsCaptchaResult: null,
      userInfo: null
    };
  },
  computed: {
    // 1.手机号码验证
    phoneNumberRight() {
      let value = this.isShowSMSLogin ? this.login_phone : this.login_userName;
      // 1.1 当输入的手机号大于10位进行验证
      if (value.length > 10) {
        return /[1][3,4,5,6,7,8][0-9]{9}$/.test(value);
      } else {
        return true;
      }
    },
    // 2.发送验证码按钮显示
    captchaDisable() {
      if (this.login_phone.length > 10 && this.phoneNumberRight) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    switchLogin() {
      this.isShowSMSLogin = !this.isShowSMSLogin;
    },
    // 3.账号密码登录切换图片验证码
    getCaptcha() {
      // 获取验证码的标签
      let captchaEle = this.$refs.imgCaptcha;
      this.$set(
        captchaEle,
        "src",
        "http://demo.itlike.com/web/xlmc/api/captcha?time=" + new Date()
      );
    },
    // 4.获取手机验证码
    async sendVerifyCode() {
      this.countDown = 60;
      this.timeIntervalID = setInterval(() => {
        this.countDown--;
        // 4.1 如果减到0 则清除定时器
        if (this.countDown == 0) {
          clearInterval(this.timeIntervalID);
        }
      }, 1000);

      // 4.2 获取短信验证码
      // let result = await getPhoneCaptcha(this.login_phone);
      // if (result.success_code == 200) {
      //   this.smsCaptchaResult = result.data.code;
      //   // 4.3  获取验证码成功
      //   Dialog.alert({
      //     title: this.loginPage.tipTile,
      //     message: this.loginPage.message + result.data.code
      //   }).then(() => {});
      // }
    },
    // 5.登录
    async loginForm() {
      Toast({
        message: "密码错误",
        duration: 800
      });
    },
    // 6.注册
    async registerForm() {},
    // 7.用户协议
    agreement(index) {},
    // 8.关闭
    close() {
      this.$router.back();
    },
    // 正则验证
    phoneValidator(value, rule) {
      let name = this.active == 1 ? "手机号" : "账号";
      if (value.length > 0) {
        let isTest = /[1][3,4,5,6,7,8][0-9]{9}$/.test(value);
        this.validator.phoneMessage = !isTest ? `${name}错误，请检查` : "";
        return isTest;
      } else {
        this.validator.phoneMessage = `请输入${name}`;
        return false;
      }
    },
    passValidator(value, rule) {
      this.validator.passeMessage = "请输入密码";
      if (value.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    cardValidator(value, rule) {
      if (value.length > 0) {
        let isTest = IdCardValidate(value);
        this.validator.cardMessage = !isTest ? "请请检查身份证号码" : "";
        return isTest;
      } else {
        this.validator.cardMessage = "请输入身份证号码";
        return false;
      }
    },
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    }
  }
};
</script>
<style lang="less" scoped>
#login {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // background: url("../../images/login/back2.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  background-color: #e4dada80;
  display: flex;
  flex-direction: column;

  .loginBox {
    display: flex;
    // align-items: center;
    justify-content: center;
    flex: 1;
    opacity: 0.95;
    z-index: 500;
    background-color: #fff;
    .auth-form {
      position: relative;
      top: 20px;
      margin: 18px;
      width: 28.5rem;
      max-width: 90%;
      font-size: 1.167rem;
      background-color: #fff;
      border-radius: 8px;
      box-sizing: border-box;
      /deep/ .van-tabs__content {
        margin-top: 20px;
      }
    }
    img {
      position: absolute;
      top: 1rem;
      left: 50%;
      width: 4rem;
      transform: translate(-50%, -70%);
      z-index: 1;
      @media screen and (max-width: 320px) {
        top: 0.5rem;
        transform: translate(-50%, -40%);
        width: 5rem;
      }
    }
    .closeButton {
      position: absolute;
      right: 1rem;
      top: 0.4rem;
    }
    .verificationImage {
      position: absolute;
      right: 0;
      width: 8rem;
      height: 3rem;
      margin-left: 3rem;
    }
    .switchLogin {
      margin-top: 1rem;
      font-size: 16px;
    }
  }
}
.title {
  padding: 0.5rem;
  font-size: 0.5rem;
  color: grey;
}
.agreement {
  // margin-top: 1.667rem;
  line-height: 1rem;
  color: #767676;
  font-size: 0.867rem;
  .agreement-box {
    color: blue;
  }
}
</style>
