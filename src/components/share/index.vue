<template>
  <div>
    <van-button type="info" :icon="icon" class="shareInfo" @click="openShare" />

    <div v-show="showShare" class="popupSet opacityPopup">
      <div class="popupBackground" id="imageWrapper" ref="imageWrapper">
        <img class="image" :src="ImgUrl" />
        <div class="projectName">{{ProjectName}}</div>
        <div ref="qrCodeDiv" id="qrCode" class="qrCode" style="width: 80px;height: 80px"></div>
      </div>
    </div>
    <van-overlay :show="showShareImg" @click="showShareImg = false">
      <div v-show="showShareImg" class="popupSet">
        <img class="popupBackground" :src="imgData" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      showShare: false,
      icon: require("@/assets/images/shareButton.png"),
      Id: "",
      ProjectName: "",
      ImgUrl: "",
      imgData: "",
      showShareImg: false,
      sys: ""
    };
  },
  watch: {
    showShare() {
      if (this.showShare && !this.imgData) {
        let { Id, ProjectName, ImgUrl } = this.$route.params;
        this.Id = Id;
        this.ProjectName = ProjectName;
        this.ImgUrl =
          "http://ccreportfiles.chuanchengfc.com/images/UpLoad/2020-07-06/204apkya.xdp.jpg";
        this.bindQRCode();
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
      let herfText = `${window.location.origin}/#/share/project/${this.Id}`;
      let canvas = new QRCode(this.$refs.qrCodeDiv, {
        text: herfText,
        width: 80,
        height: 80,
        colorDark: "#333333", // 二维码颜色
        colorLight: "#ffffff", // 二维码背景色
        correctLevel: QRCode.CorrectLevel.L // 容错率，L/M/H
      });
      this.$nextTick(() => {
        this.createPicture(); // 二维码生成后，执行生成图片
      });
    },
    // 从 canvas 提取图片 image
    createPicture(canvas, herfText) {
      // window.scroll(0, 0);
      var canvas2 = document.createElement("canvas");
      // DOM节点主体
      let main = document.querySelector("#imageWrapper");
      //防止保存的图片模糊
      let w = parseInt(window.getComputedStyle(main).width);
      let h = parseInt(window.getComputedStyle(main).height);
      canvas2.width = w * 1.5;
      canvas2.height = h * 1.5;
      canvas2.style.width = w + "px";
      canvas2.style.height = h + "px";
      var context = canvas2.getContext("2d");
      context.scale(0.5, 0.5);
      //useCORS允许网络地址图片跨域
      html2canvas(this.$refs.imageWrapper, {
        canvas: canvas2,
        useCORS: true
        // width: w, //设置canvas尺寸与所截图尺寸相同，防止白边
        // height: h
      }).then(canvas => {
        // this.imgData = canvas.toDataURL();
        this.imgData = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        this.showShare = false;
        this.showShareImg = true;
      });
    },
    phone() {
      if (navigator.userAgent.match("Android")) {
        this.sys = "Android";
      } else if (navigator.userAgent.match("iPhone")) {
        this.sys = "iPhone";
      } else if (navigator.userAgent.match("iPad")) {
        this.sys = "iPad";
      } else {
        alert(navigator.userAgent);
      }
    },
    openShare() {
      if (this.imgData) {
        this.showShareImg = true;
      } else {
        this.showShare = true;
      }
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
  padding: 0;
  height: 38px;
  width: 38px;
  /deep/ .van-button__icon {
    width: 100%;
    height: 100%;
    .van-icon__image {
      padding: 5px;
      width: 100%;
      height: 100%;
    }
  }
}
.popupSet {
  position: absolute;
  z-index: 100;
  top: 50%;
  left: 50%;
  margin-top: -250px;
  margin-left: -150px;
  &.opacityPopup {
    opacity: 0;
  }
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
    left: 29px;
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
