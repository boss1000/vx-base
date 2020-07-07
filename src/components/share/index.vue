<template>
  <div>
    <van-button type="info" icon="star-o" class="shareInfo" @click="showShare=true" />

    <van-popup v-model="showShare" :get-container="getContainer" class="popup" @touchmove.prevent>
      <div class="popupBackground">
        <img class="image" :src="ImgUrl" />
        <div class="projectName">{{ProjectName}}</div>
        <div ref="qrCodeDiv" id="qrCode" class="qrCode" style="width: 80px;height: 80px"></div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      showShare: false,
      Id: "",
      ProjectName: "",
      ImgUrl: "",
      imgData: ""
    };
  },
  watch: {
    showShare() {
      if (this.showShare && !this.imgData) {
        this.$nextTick(() => {
          let { Id, ProjectName, ImgUrl } = this.$route.params;
          this.Id = Id;
          this.ProjectName = ProjectName;
          this.ImgUrl = ImgUrl;
          this.bindQRCode();
        });
      }
    }
  },
  mounted() {
    // this.bindQRCode();
  },
  methods: {
    getContainer() {
      return document.querySelector(".commonBase");
    },
    bindQRCode() {
      let herfText = `${window.location.origin}/share/project/${this.Id}`;
      console.log(herfText)
      new QRCode(this.$refs.qrCodeDiv, {
        text: herfText,
        width: 80,
        height: 80,
        colorDark: "#333333", // 二维码颜色
        colorLight: "#ffffff", // 二维码背景色
        correctLevel: QRCode.CorrectLevel.L // 容错率，L/M/H
      });
      this.createPicture(); // 二维码生成后，执行生成图片
    },
    // 从 canvas 提取图片 image
    createPicture(canvas) {
      html2canvas(this.$refs.qrCodeDiv, {
        text: "http://192.168.0.xx:8765/#/SignAgency",
        backgroundColor: null,
        width: 80,
        height: 80
      }).then(canvas => {
        var imgData = canvas.toDataURL("image/jpeg");
        this.imgData = imgData;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.shareInfo {
  position: fixed;
  right: 10px;
  top: 80px;
  opacity: 0.8;
}
.popupBackground {
  position: relative;
  width: 300px;
  height: 500px;
  background-image: url("../../assets/images/share.jpg");
  background-size: 100% 100%;
  .image {
    position: absolute;
    width: 242px;
    height: 180px;
    top: 150px;
    left: 29.5px;
  }
  .projectName {
    position: absolute;
    width: 241.5px;
    height: 25.5px;
    line-height: 23.5px;
    top: 330px;
    left: 29.5px;
    font-family: pingFang;
    color: #fff;
    text-align: center;
    font-size: 18px;
  }
  .qrCode {
    position: absolute;
    right: 20px;
    bottom: 30px;
    img {
      padding: 4px;
      background: #fff;
    }
  }
}
</style>
<style lang="scss">
.qrCode {
  img {
    padding: 4px;
    background: #fff;
  }
}
</style>
