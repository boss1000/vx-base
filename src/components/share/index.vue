<template>
  <div>
    <van-button type="info" :icon="icon" class="shareInfo" @click="openShare" />
    <div v-show="showShare" class="popupSet opacityPopup" @touchmove.prevent>
      <div class="popupBackground" id="imageWrapper" ref="imageWrapper">
        <img :src="backgroundImg" style="width: 100%;height: 100%;" />
        <img class="image" :src="ImgUrl" @load="imgload = true" />
        <div class="projectName">{{ProjectName}}</div>
        <div ref="qrCodeDiv" id="qrCode" class="qrCode" style="width: 80px;height: 80px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { UploadPhysical } from "@/api/project";
import html2canvas from "html2canvas";
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      showShare: true,
      imgload: false,
      backgroundImg: require("@/assets/images/share.jpg"),
      icon: require("@/assets/images/shareButton.png"),
      Id: "",
      ProjectName: "",
      ImgUrl: "",
      imgData: "",
      sys: ""
    };
  },
  props: {
    imgshareUrl: {
      type: String,
      default: ""
    },
    showShareImg: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    imgload() {
      if (this.imgload) {
        this.createPicture(); // 二维码生成后，执行生成图片
      }
    }
  },
  mounted() {
    let { Id, ProjectName, ImgUrl } = this.$route.params;
    this.Id = Id;
    this.ProjectName = ProjectName;
    this.ImgUrl = ImgUrl;
    this.bindQRCode();
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
        useCORS: true,
        width: w, //设置canvas尺寸与所截图尺寸相同，防止白边
        height: h
      }).then(canvas => {
        let base64ImgSrc = canvas.toDataURL("image/png");
        let file = this.base64ToFile(base64ImgSrc, "QRCode");
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
      this.$emit("update:showShareImg", true);
      // this.showShareImg = true;
    },
    base64ToFile(dataUrl, fileName) {
      let arr = dataUrl.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let suffix = mime.split("/")[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      let filename = "temp_img";
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      let file = new File([u8arr], `${filename}.${suffix}`, { type: mime });
      let formdata = new FormData();
      formdata.append("files", file);
      UploadPhysical(formdata).then(res => {
        let url =
          "http://ccreportfiles.chuanchengfc.com" +
          res.Result.fileNames[0].replace(/\\/g, "/");
        this.$emit("update:imgshareUrl", url);
        this.showShare = false;
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
    z-index: 1;
  }
}

.popupBackground {
  position: relative;
  width: 300px;
  height: 500px;
  // background-image: url("../../assets/images/share.jpg");
  // background-size: 100% 100%;
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
