<template>
  <div class="map-warp">
    <baidu-map
      class="map"
      ak="ufeGpwfCdo4WLZKtSVoOQXfMwykKkyov"
      :center="center"
      :zoom="zoom"
      @ready="handler"
    ></baidu-map>
  </div>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map";

export default {
  name: "BaiDuMap",
  components: {
    BaiduMap
  },
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 15
    };
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 118.835;
      this.center.lat = 32.0835479;
    }
  }
};
</script>

<style>
.map {
  width: 100%;
  height: 400px;
}
</style>