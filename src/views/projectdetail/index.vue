<template>
  <div class="commonBase">
    <van-nav-bar
      left-arrow
      class="commonTitle"
      @click-left="onClickLeft"
      :title="detailForm.title"
    />
    <div class="auth-form">
      <van-image
        class="imageSize"
        fit="contain"
        lazy-load
        :src="detailForm.image"
        @click="openImagePreview"
      />
      <div class="detailContent">
        <van-row>
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
        </van-row>
        <van-row>
          <van-col class="name" span="6">特别说明</van-col>
          <van-col class="content" span="18">{{detailForm.notice}}</van-col>
        </van-row>
        <van-row>
          <van-button class="buttonRight" type="info" size="small" block @click="openReport">报备</van-button>
        </van-row>
        <van-row>
          <van-col class="name" offset="4" span="4">访问人数</van-col>
          <van-col class="number" span="2">2332</van-col>
          <van-col class="name" offset="1" span="4">访问次数</van-col>
          <van-col class="number" span="2">232</van-col>
          <van-col class="name" offset="1" span="4">转发次数</van-col>
          <van-col class="number" span="2">223</van-col>
        </van-row>

        <van-row>
          <Map @openBigMap="openBigMap"></Map>
        </van-row>
      </div>

      <van-popup v-model="showbigMap" :style="{ height: '80%',width: '100%' }">
        <div class="bigMapbox">
          <Map v-if="showbigMap" @openBigMap="openBigMap" :isSalce="false" />
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
      detailForm: {
        id: this.$route.params.id,
        title: this.$route.params.title || "万科新都会", // 项目
        image: "https://img.yzcdn.cn/vant/apple-1.jpg",
        reportnum: "5123",
        username: "林海静",
        userphone: "13698761234",
        discount:
          "首付90w96折,全款94折,首付90w96折,全款94折,首付90w96折,全款94折,首付90w96折,全款94折",
        developers: "万科",
        openquotation: "最新2020年8月20",
        commission: "120m²以上30000,120m²以下0.9%",
        notice:
          "万科新都会，3室2厅2卫，好楼层，阳光无遮挡.高品质小区，环境优美，物业管理好。楼层也好，采光无遮.万科新都会，3室2厅2卫，好楼层，阳光无遮挡.高品质小区，环境优美，物业管理好。楼层也好，采光无遮.万科新都会，3室2厅2卫，好楼层，阳光无遮挡.高品质小区，环境优美，物业管理好。楼层也好，采光无遮.万科新都会，3室2厅2卫，好楼层，阳光无遮挡.高品质小区，环境优美，物业管理好。楼层也好，采光无遮.万科新都会，3室2厅2卫，好楼层，阳光无遮挡.高品质小区，环境优美，物业管理好。楼层也好，采光无遮."
      }
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
        console.log(res)
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
      this.$router.push({
        name: "report",
        params: {
          id: this.detailForm.id,
          title: this.detailForm.title,
          username: this.detailForm.username,
          userphone: this.detailForm.userphone
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