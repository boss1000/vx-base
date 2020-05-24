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
            <van-button class="buttonRight" type="danger" size="small" @click="resetPass">重置密码</van-button>
            <van-button class="buttonRight" type="info" size="small" @click="modifyData(item)">修改</van-button>
            <van-button type="info" size="small" @click="opendetail(item)">数据</van-button>
          </van-row>
        </div>
      </div>
    </div>
    <van-dialog
      v-model="showModify"
      show-cancel-button
      confirm-button-text="确认修改"
      :before-close="onBeforeClose"
      @confirm="postModify"
    >
      <van-form ref="postModify" class="auth-form">
        <van-field
          v-model="modify.name"
          name="姓名"
          label="姓名"
          placeholder="请输入姓名"
          :rules="[{ required: true, message: '请输入姓名' }]"
        />
        <van-field
          v-model="modify.system"
          name="门店"
          label="门店"
          placeholder="请输入门店"
          :rules="[{ required: true, message: '请输入门店' }]"
        />
      </van-form>
    </van-dialog>
  </div>
</template>
<script>
import { Dialog, Toast } from "vant";
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
      showModify: false,
      currReport: {},
      modify: {
        name: "",
        system: ""
      }
    };
  },
  watch: {
    showModify() {
      if (!this.showModify) {
        this.modify = Object.assign(
          {},
          this.$data.modify,
          this.$options.data().modify
        );
        this.$refs["postModify"].resetValidation();
      }
    }
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
    opendetail(item) {
      this.$router.push({
        name: "accountReport",
        params: {
          id: item.id,
          name: item.name
        }
      });
    },
    resetPass() {
      Toast("密码重置成功");
    },
    modifyData(item) {
      this.showModify = true;
    },
    onBeforeClose(action, done) {
      if (action === "confirm") {
        return done(false);
      } else {
        // 重置表单校验

        this.$refs["postModify"].resetValidation();
        return done();
      }
    },
    postModify() {
      this.$refs["postModify"]
        .validate()
        .then(() => {
          this.showModify = false;
          console.log(this.modify);
        })
        .catch(() => {});
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
.auth-form {
  padding-bottom: 0;
  .van-cell:last-child {
    padding: 0;
  }
  /deep/ .van-field__label {
    width: 50px;
  }
}
</style>