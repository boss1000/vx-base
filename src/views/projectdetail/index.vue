<template>
  <div class="commonBase">
    <van-nav-bar
      left-arrow
      class="commonTitle"
      @click-left="onClickLeft"
      :title="detailForm.title"
    />
    <div class="auth-form">
      <!-- <van-image
        class="imageSize"
        fit="contain"
        lazy-load
        :src="detailForm.image"
        @click="openImagePreview"
      />-->
      <div class="detailContent">
        <!-- <van-row>
          <van-col class="title" span="12">{{detailForm.title}}</van-col>
        </van-row>
        <van-row>
          <van-col class="name" span="6">报备数</van-col>
          <van-col class="content" span="18">{{detailForm.reportnum}}</van-col>
        </van-row>
        <van-row>
          <van-col class="name" span="6">负责人</van-col>
          <van-col class="content" span="18">
            {{detailForm.username}} -
            <span
              class="phone"
              @click="openphone(detailForm.userphone)"
            >{{detailForm.userphone}}</span>
          </van-col>
        </van-row>
        <van-row>
          <van-col class="name" span="6">折扣</van-col>
          <van-col class="content" span="18">{{detailForm.discount}}</van-col>
        </van-row>
        <van-row>
          <van-col class="name" span="6">开发商</van-col>
          <van-col class="content" span="18">{{detailForm.developers}}</van-col>
        </van-row>
        <van-row>
          <van-col class="name" span="6">开盘时间</van-col>
          <van-col class="content" span="18">{{detailForm.openquotation}}</van-col>
        </van-row>
        <van-row>
          <van-col class="name" span="6">佣金</van-col>
          <van-col class="content" span="18">{{detailForm.commission}}</van-col>
        </van-row>-->
        <van-row>
          <van-col class="name" span="6">特别说明</van-col>
          <van-col class="content" span="18" v-html="detailForm.Detail">{{detailForm.Detail}}</van-col>
        </van-row>
        <van-row>
          <van-button class="buttonRight" type="info" size="small" block @click="openReport">报备</van-button>
        </van-row>
        <van-row>
          <van-col class="name" offset="4" span="4">访问人数</van-col>
          <van-col class="number" span="2">{{detailForm.ReportCount}}</van-col>
          <van-col class="name" offset="1" span="4">访问次数</van-col>
          <van-col class="number" span="2">{{detailForm.ReportCount}}</van-col>
          <van-col class="name" offset="1" span="4">转发次数</van-col>
          <van-col class="number" span="2">{{detailForm.ReportCount}}</van-col>
        </van-row>

        <van-row>
          <Map @openBigMap="openBigMap" :detailForm="detailForm"></Map>
        </van-row>
      </div>

      <van-popup v-model="showbigMap" :style="{ height: '80%',width: '100%' }">
        <div class="bigMapbox">
          <Map @openBigMap="openBigMap" :showbigMap="showbigMap" :detailForm="detailForm" :isSalce="false" />
        </div>
      </van-popup>

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
  </div>
</template>
<script>
import { ImagePreview, Popup } from "vant";
import linkageRules from "../../components/linkageRules";
import Map from "../../components/Maps/Map";
import { AddProject, GetDetail } from "@/api/project";
export default {
  data() {
    return {
      reportShow: false,
      showbigMap: false,
      detailForm: {}
    };
  },
  components: {
    linkageRules,
    Map
  },
  mounted() {
    this.getdetail();
  },
  methods: {
    getdetail() {
      GetDetail({
        projectID: this.$route.params.id
      }).then(res => {
        this.detailForm = res.Result;
      });
    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    openImagePreview() {
      ImagePreview({
        images: [this.detailForm.image],
        showIndex: false
      });
    },
    openReport() {
      this.reportShow = true;
    },
    agreeReportShow() {
      let {
        Id,
        ProjectName,
        PrincipalerName,
        PrincipalerMobile
      } = this.currReport;
      this.$router.push({
        name: "report",
        params: {
          Id,
          ProjectName,
          PrincipalerName,
          PrincipalerMobile
        }
      });
    },
    openBigMap() {
      this.showbigMap = true;
    }
  }
};
</script>
<style lang="less" scoped>
.commonBase {
  .detailContent {
    margin-top: 20px;
    .name {
      color: #908585;
    }
    .number {
      color: #000;
      font-size: 14px;
      line-height: 20px;
      text-indent: 5px;
    }
  }
  .imageSize {
    height: 200px;
    width: 100%;
  }
  .bigMapbox {
    width: 100%;
    height: 100%;
  }
  .content {
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }
}
</style>
<style lang="less">
pre {
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}
</style>>