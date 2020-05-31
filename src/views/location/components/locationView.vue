<template>
  <div class="infoPreview">
    <div
      v-for="(item,index) in locationList"
      :key="index"
      :class="['infoBox', (index + 1 !== locationList.length ) ? 'van-hairline--bottom' : '']"
    >
      <div class="buildContent">
        <div class="contentBox">
          <van-row class="halfBorder">
            <van-col class="name" span="8">报备项目</van-col>
            <van-col class="content" span="16">{{item.title}}</van-col>
          </van-row>
          <van-row class="halfBorder">
            <van-col class="name" span="8">负责人</van-col>
            <van-col class="content" span="16">
              {{item.username}} -
              <span class="phone" @click="openphone(item.userphone)"></span>
            </van-col>
          </van-row>
          <van-row class="halfBorder">
            <van-col class="name" span="8">客户姓名</van-col>
            <van-col class="content" span="16">{{item.customername}}</van-col>
          </van-row>
          <van-row class="halfBorder">
            <van-col class="name" span="8">客户电话</van-col>
            <van-col
              class="content phone"
              span="16"
              @click="openphone(item.customerphone)"
            >{{item.customerphone}}</van-col>
          </van-row>
          <van-row class="halfBorder">
            <van-col class="name" span="8">预约来访日期</van-col>
            <van-col class="content" span="16">{{item.preparietaldate}} {{item.preparietaltime}}</van-col>
          </van-row>
          <van-row class="halfBorder">
            <van-col class="name" span="8">体系</van-col>
            <van-col class="content" span="16">{{ item.system }}</van-col>
          </van-row>
          <van-row class="halfBorder">
            <van-col class="name" span="8">报备人</van-col>
            <van-col class="content" span="16">{{item.reportname}}</van-col>
          </van-row>
          <van-row class="halfBorder">
            <van-col class="name" span="8">报备电话</van-col>
            <van-col
              class="content phone"
              span="16"
              @click="openphone(item.reportphone)"
            >{{ item.reportphone }}</van-col>
          </van-row>
          <van-row class="halfBorder">
            <van-col class="name" span="8">所在门店</van-col>
            <van-col class="content" span="16">{{item.store}}</van-col>
          </van-row>
          <van-row class="halfBorder">
            <van-col class="name" span="8">报备状态</van-col>
            <van-col class="content" span="16">{{ conversionSate(item.state) }}</van-col>
          </van-row>
          <van-row :class="['halfBorder',{'hideBorder':roles !== '2'}]">
            <van-col class="name" span="8">备注</van-col>
            <van-col class="content notice" span="16">{{item.remark}}</van-col>
          </van-row>
          <van-row v-if="roles == '2'" class="controlBox" type="flex" justify="end">
            <van-button
              class="buttonRight"
              type="info"
              size="small"
              @click="changeSate(conversionSate(item.state))"
            >修改状态</van-button>
          </van-row>
        </div>
      </div>
    </div>
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
<script>
import { Dialog, Toast } from "vant";
import { mapState, mapGetters, mapActions } from "vuex";
import VanFieldSelectPicker from "@/components/VanFieldSelectPicker";
export default {
  name: "locationView",
  props: {
    locationList: {
      type: Array,
      default: []
    },
    sateList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      showModify: false,
      destoryPoupState: true,
      defaultIndex: "0",
      satelabel: "请选择",
      currReport: {},
      modify: {
        name: "",
        system: ""
      }
    };
  },
  watch: {},
  components: {
    VanFieldSelectPicker
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
    changeSate() {
      this.destoryPoupState = true;
      this.$nextTick(() => {
        this.showModify = true;
      });
    },
    onBeforeClose(action, done) {},
    postModify() {},
    onConfirm(value) {
      // this.result = value;
      this.showModify = !this.showModify;
    },
    conversionSate(value) {
      this.satelabel = this.sateList.find((item, index) => {
        if (item.value == value) {
          this.defaultIndex = index;
          return item;
        }
      }).label;
      return this.satelabel;
    },
    destoryPoup() {
      this.destoryPoupState = false;
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
          min-height: 30px;
          font-size: 14px;
          line-height: 20px;
          text-indent: 5px;
          // margin-top: 10px;
          &.notice {
            text-indent: 0px;
            padding: 0 5px !important;
          }
        }
        .phone {
          color: #ff0000;
        }
      }
      .buttonRight {
        margin-right: 10px;
      }
      .hideBorder {
        border: none !important;
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