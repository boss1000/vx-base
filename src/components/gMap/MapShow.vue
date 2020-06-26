<template>
  <div :class="['dituContent',{'bigMap':!isSalce}]">
    <!-- <div class="mapZindex mapBox" v-if="isSalce"></div> -->
    <div id="container" class="dituContent"></div>
  </div>
</template>

<script>
import { bd_decrypt } from "@/utils/common.js";
export default {
  data() {
    return {
      map: null,
      iconUrl: require("@/assets/images/mk_icon.png")
    };
  },
  computed: {
    getId() {
      return `dituContent${this.isSalce ? "small" : "big"}`;
    }
  },
  props: {
    isSalce: {
      type: Boolean,
      default: true
    },
    detailForm: {
      type: Object,
      default: () => {}
    },
    showbigMap: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    detailForm: {
      handler() {
        this.initMap();
      },
      deep: true
    },
    showbigMap: {
      handler() {
        if (this.showbigMap) {
          this.$nextTick(() => {
            this.initMap();
          });
        }
      },
      immediate: true
    }
  },
  mounted() {
    // this.initMap();
  },
  methods: {
    initMap() {
      let pointSet = this.detailForm.GPS.split(",");
      let center = bd_decrypt(parseFloat(pointSet[0]), pointSet[1]);
      this.map = new AMap.Map("container", {
        zoom: 14, // 级别
        center: center, // 中心点坐标
        viewMode: "3D" // 使用3D视图
      });
      this.addMarker(center);
    },
    // 实例化点标记
    addMarker(center) {
      let marker = new AMap.Marker({
        position: center //位置
      });
      this.map.add(marker); //添加到地图

      let infoWindow = new AMap.InfoWindow({
        content: this.detailForm.Address, //信息窗体的内容可以是任意html片段
        offset: new AMap.Pixel(0, -35)
      });
      infoWindow.open(this.map, center);
    }
  }
};
</script>
<style lang="less" scoped>
.dituContent {
  width: 100%;
  height: 300px;
  overflow: hidden;
  margin: 0px auto;
  font-family: "微软雅黑";
  position: relative;
  .mapBox {
    height: 100%;
    width: 100%;
  }
  .mapZindex {
    position: absolute;
    opacity: 0;
    z-index: 100;
  }
  &.bigMap {
    height: 100%;
  }
}
.map {
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss">
.anchorBL {
  display: none;
}
.BMap_bubble_content {
  margin-top: 20px;
}
.infowindow {
  // z-index: 101;
}
.BMap_Marker {
  img {
    height: 100%;
    width: 100%;
    z-index: 801;
  }
}
</style>
