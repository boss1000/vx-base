<template>
  <div class="commonBase">
    <van-nav-bar left-arrow class="commonTitle" @click-left="onClickLeft" :title="title" />
    <div ref="authform" class="auth-form">
      <showLoading :showLoading="showLoading"></showLoading>
      <!-- <share></share> -->
      <div ref="contentform" class="detailContent">
        <van-row>
          <van-col
            class="content"
            span="24"
            @click="getImg($event)"
            v-html="detailForm.Detail"
          >{{detailForm.Detail}}</van-col>
        </van-row>
        <van-row>
          <van-button class="buttonRight" type="info" size="small" block @click="openReport">报备</van-button>
        </van-row>
        <van-row>
          <van-col class="name" offset="4" span="4">访问人数</van-col>
          <van-col class="number" span="2">{{detailForm.ReportCount}}</van-col>
          <van-col class="name" offset="1" span="4">访问次数</van-col>
          <van-col class="number" span="2">{{detailForm.AccessCounts}}</van-col>
          <van-col class="name" offset="1" span="4">转发次数</van-col>
          <van-col class="number" span="2">{{detailForm.ShareCounts}}</van-col>
        </van-row>

        <Map ref="listMap" :showMap="showMap" :detailForm="detailForm" @openBigMap="openBigMap"></Map>
      </div>
      <van-popup
        v-model="showbigMap"
        :get-container="getContainer"
        :style="{ height: '90%',width: '100%' }"
        class="popup"
        closeable
        @touchmove.prevent
      >
        <Map
          :showbigMap="showbigMap"
          :detailForm="detailForm"
          :isSalce="false"
          @openBigMap="openBigMap"
        />
      </van-popup>

      <van-dialog
        v-model="reportShow"
        title="联动规则"
        confirmButtonText="同意"
        show-cancel-button
        @confirm="agreeReportShow"
      >
        <linkageRules></linkageRules>
      </van-dialog>
    </div>
  </div>
</template>
<script>
import { ImagePreview, Popup } from "vant";
import linkageRules from "@/components/linkageRules";
import showLoading from "@/components/showLoading";
import Map from "@/components/bMap/MapShow";
import { AddProject, GetDetail } from "@/api/project";
import share from "@/components/share";
import { mapGetters } from "vuex";
export default {
  name: "projectdetail",
  data() {
    return {
      finished: false,
      reportShow: false,
      showMap: false,
      showbigMap: false,
      showLoading: false,
      title: "",
      detailForm: {}
    };
  },
  computed: {
    ...mapGetters(["detailCurr"])
  },
  components: {
    linkageRules,
    Map,
    showLoading,
    share
  },
  mounted() {
    // // 是否为外部跳转
    // // /share/project/31/瑞安中心
    // if (this.$route.redirectedFrom) {
    //   this.isRedirected = true;
    //   let setUrl = this.$route.redirectedFrom
    //     .replace("/share/project", "")
    //     .split("/")
    //     .filter(item => item);
    //   this.$store.dispatch("user/detailCurr", {
    //     projectID: setUrl[0],
    //     title: setUrl[1]
    //   });
    //   this.$nextTick(() => {
    //     this.getdetail();
    //   });
    if (
      Object.keys(this.detailCurr).length == 0 &&
      Object.keys(this.$route.params).length == 0
    ) {
      this.$router.go(-1);
    } else {
      this.getdetail();
    }
  },
  methods: {
    getdetail() {
      this.showLoading = true;
      GetDetail({
        projectID: this.$route.params.Id || this.detailCurr.projectID
      }).then(res => {
        this.detailForm = res.Result;
        this.title = this.$route.params.ProjectName || this.detailCurr.title;
        this.showLoading = false;
        this.$store.dispatch("user/detailCurr", {
          projectID: this.$route.params.Id,
          title: this.$route.params.ProjectName
        });
        this.$nextTick(() => {
          this.showMap = true;
        });
      });
    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
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
      } = this.$route.params;

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
    },
    getImg(event) {
      let getSrc = event.target.getAttribute("src");
      if (getSrc) {
        ImagePreview({
          images: [getSrc],
          showIndex: false
        });
      }
    },
    getContainer() {
      return document.querySelector(".commonBase");
    }
  }
};
</script>
<style lang="less" scoped>
.commonBase {
  .detailContent {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
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
  .auth-form {
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
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