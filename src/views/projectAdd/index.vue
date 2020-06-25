<template>
  <div class="commonBase">
    <van-nav-bar
      left-arrow
      class="commonTitle"
      @click-left="onClickLeft"
      :title="detailForm.title"
    />
    <div class="auth-form">
      <div class="detailContent">
        <van-row>
          <van-col class="name" span="6">特别说明</van-col>
          <van-col class="content" span="18">{{detailForm.Detail}}</van-col>
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
          <Map @openBigMap="openBigMap"></Map>
        </van-row>
      </div>
    </div>
  </div>
</template>
<script>
import { ImagePreview, Popup } from "vant";
import linkageRules from "../../components/linkageRules";
import Map from "../../components/bMap/MapShow";
import { AddProject, GetDetail } from "@/api/project";
export default {
  name: "projectAdd",
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
}
</style>