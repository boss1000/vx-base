<template>
  <div :class="['dituContent',{'bigMap':!isSalce}]">
    <div class="mapZindex mapBox" v-if="isSalce" @click="openBig"></div>
    <!-- <div class="mapBox" :id="getId"></div> -->
    <baidu-map
      id="mapID"
      class="map"
      :center="postionMap"
      :zoom="zoom"
      :dragging="showbigMap"
      :pinch-to-zoom="showbigMap"
      :double-click-zoom="false"
      @click="getPoint"
    >
      <!--信息窗口，show属性是控制显示隐藏，infoWindowClose和infoWindowOpen是控制信息窗口关闭隐藏的方法-->
      <bm-marker
        :position="pointMap"
        animation="BMAP_ANIMATION_BOUNCE"
        :icon="{url: iconUrl, size: {width: 30, height: 30}}"
      >
        <bm-info-window
          class="infowindow"
          :show="showPoint"
          @close="infoWindowClose"
          @open="infoWindowOpen"
          :offset="{ height: -10}"
        >
          <p>{{ Address }}</p>
        </bm-info-window>
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPoint: true,
      zoom: 13.8, // 放大比例
      postionMap: {
        // 地图坐标
        lng: null,
        lat: null
      },
      pointMap: {
        // 标单坐标
        lng: null,
        lat: null
      },
      Address: "测试",
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
      this.Address = this.detailForm.Address;
      this.postionMap = {
        lng: parseFloat(pointSet[0]),
        lat: parseFloat(pointSet[1])
      };
      this.$nextTick(() => {
        this.pointMap = Object.assign({}, this.pointMap, this.postionMap);
      });
    },
    getPoint(e) {
      setTimeout(() => {
        this.showPoint = true;
      }, 100);
      let geocoder = new BMap.Geocoder(); // 创建地址解析器的实例
      geocoder.getLocation(e.point, rs => {
        this.showPoint = true;
      });
    },
    openBig() {
      this.$emit("openBigMap");
    },
    infoWindowClose() {
      this.showPoint = false;
    },
    infoWindowOpen() {
      this.showPoint = true;
    },
    addPoint() {
      this.pointMap = Object.assign({}, this.pointMap, this.postionMap);
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
