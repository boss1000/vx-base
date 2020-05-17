<template>
  <div>
    <headerSwipe></headerSwipe>
    <van-row class="middleNav">
      <van-col v-for="item in imageList" :key="item.icon" span="6" @click="middleRoute(item.route)">
        <svg-icon :icon-class="item.icon" />
        <div class="titleNmae">{{ item.title }}</div>
      </van-col>
    </van-row>
    <div class="mainContent">
      <div class="titleName">
        <span class="name">楼盘推荐</span>
        <span class="more">更多楼盘></span>
      </div>
      <buildPreview :buildList="buildList"></buildPreview>
      <div class="titleName">
        <span class="name">热门资讯</span>
        <span class="more">更多咨询></span>
      </div>
      <infoview :infoList="infoList"></infoview>
    </div>
  </div>
</template>
<script>
import headerSwipe from "./components/headerSwipe";
import buildPreview from "../../components/buildPreview";
import infoview from "../../components/infoview";
export default {
  nmae: "home",
  components: { headerSwipe, buildPreview, infoview },
  data() {
    return {
      imageList: [
        {
          title: "最新资讯",
          icon: "newinfo",
          route: "newinfo"
        },
        {
          title: "主案楼盘",
          icon: "mainbuild",
          route: "build"
        },
        {
          title: "楼盘列表",
          icon: "dalou",
          route: "build"
        },
        {
          title: "地图找房",
          icon: "mapset",
          route: "location"
        }
      ],
      buildList: [
        {
          name: "新鹿城",
          size: "102-140",
          tag: ['瓯海第一盘','瓯海第一盘'],
          address: "路程区牛山北路（百里亭公交站）",
          price: "240",
          image: "https://img.yzcdn.cn/vant/apple-1.jpg"
        },
        {
          name: "新鹿城",
          size: "102-140",
          tag: ['瓯海第一盘'],
          address: "路程区牛山北路（百里亭公交站）",
          price: "240",
          image: "https://img.yzcdn.cn/vant/apple-1.jpg"
        },
        {
          name: "新鹿城",
          size: "102-140",
          address: "路程区牛山北路（百里亭公交站）",
          price: "240",
          image: "https://img.yzcdn.cn/vant/apple-1.jpg"
        }
      ],
      infoList: [
        {
          title:
            "万科新都会，3室2厅2卫，好楼层，阳光无遮挡.高品质小区，环境优美，物业管理好。楼层也好，采光无遮.",
          time: "2020-5-2",
          image: "https://img.yzcdn.cn/vant/apple-1.jpg"
        },
        {
          title:
            "万科新都会，3室2厅2卫，好楼层，阳光无遮挡.高品质小区，环境优美，物业管理好。楼层也好，采光无遮.",
          time: "2020-5-2",
          image: "https://img.yzcdn.cn/vant/apple-1.jpg"
        }
      ]
    };
  },
  methods: {
    middleRoute(routeName) {
      this.$router.push(routeName);
    }
  }
};
</script>
<style lang="less" scoped>
.middleNav {
  margin-top: 10px;
  text-align: center;
  .svg-icon {
    height: 35px;
    width: 35px;
  }
  .titleNmae {
    padding: 10px 0;
  }
}
.mainContent {
  margin: 0 15px;
  .titleName {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    .name {
      font-size: 18px;
    }
    .more {
      font-size: 14px;
      color: #908585;
    }
  }
}
</style>
