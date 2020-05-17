<template>
  <div id="dashboard">
    <!-- 缓存界面选择加载 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <van-tabbar
      v-model="active"
      :safe-area-inset-bottom="true"
      :placeholder="true"
      @change="tabchange"
      class="tabbarNav"
    >
      <van-tabbar-item v-for="(item, index) in tabbars" :key="index">
        <span>{{ item.title }}</span>
        <template slot="icon" slot-scope="props">
          <svg-icon :icon-class="props.active ? item.active : item.normal" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script type="text/javascript">
import { setLocalStore, getLocalStore } from "../../config/global.js";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "DashBoard",
  mounted() {},
  created() {
    //通过路由跳转绑定Tabbar的选中
    this.tabbarSelected(this.$route.name);
  },
  watch: {
    // 监听路由变化,保证路由跳转Tabbar选中正常
    $route: {
      handler(val, oldval) {
        this.tabbarSelected(val.name);
      }
    },
    deep: true
  },
  data() {
    return {
      active: 0,
      tabbars: [
        {
          name: "home",
          title: "首页",
          normal: "home",
          active: "home-active"
        },
        {
          name: "build",
          title: "楼盘",
          normal: "build",
          active: "build-active"
        },
        {
          name: "location",
          title: "地图找房",
          normal: "location",
          active: "location-active"
        },
        {
          name: "mine",
          title: "用户中心",
          normal: "user",
          active: "user-active"
        }
      ]
    };
  },
  components: {},
  mounted() {},
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    // 1.点击tabbar触发的方法
    tabchange(num) {
      this.$router.push(this.tabbars[num].name);
    },
    tabbarSelected(item) {
      const mapType = {
        home: 0,
        build: 1,
        location: 2,
        mine: 3
      };
      this.active = mapType[item];
    }
  }
};
</script>
<style lang="less" scoped>
.tabbarNav {
  // padding-top: 10px;
  margin-top: 20px;
  height: 1.3rem !important;
  /deep/ .van-hairline--top-bottom {
    border-top: solid 1px #ccc;
  }
}
/*转场动画*/
.router-slider-enter-active,
.router-slider-leave-active {
  transition: all 0.3s;
}
.router-slider-enter,
.router-slider-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
@keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
@-moz-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
@-webkit-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
@-o-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
.moveToCart {
  animation: mymove 0.5s ease-in-out;
}
</style>
