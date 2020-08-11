<template>
  <div class="reportLink">
    <van-field
      center
      clearable
      :label="labelTitle"
      :label-width="setlabelWidth"
      @click="showPopup = true"
    >
      <template #input>
        <div class="inputClass">
          <div class="inputFlex">
            <span>{{ ResponsibleProjectsName[0] }}</span>
            <van-tag v-if="showTag" type="primary">{{ `+${ResponsibleProjectsName.length - 1}` }}</van-tag>
          </div>
          <van-icon name="plus" />
        </div>
      </template>
    </van-field>
    <van-popup
      v-model="showPopup"
      position="right"
      :style="popupClass"
      closeable
      close-icon-position="top-left"
      get-container="body"
    >
      <van-row class="checkBox" type="flex" justify="left">
        <van-button class="buttonRight" type="info" size="mini" @click="sureReport()">确定</van-button>
        <van-button class="buttonRight" type="info" size="mini" @click="searchData()">查询</van-button>
      </van-row>
      <van-row class="searchBox" type="flex" justify="left">
        <van-search style="width:100%" v-model="ProjectName" placeholder="请输入搜索关键词"></van-search>
      </van-row>
      <van-list class="checkListClass" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-checkbox-group v-model="ResponsibleProjects">
          <van-cell-group v-if="reloadgroup" v-model="loading">
            <van-cell
              v-for="(item, index) in infoList"
              clickable
              :key="item.Id"
              :title="`${item.ProjectName}`"
              :disabled="item.Id == defaultIndex[0]"
              @click="toggle(index)"
            >
              <template #right-icon>
                <van-checkbox
                  :disabled="item.Id == defaultIndex[0]"
                  shape="square"
                  :name="item.Id"
                  ref="checkboxes"
                />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </van-list>
    </van-popup>
  </div>
</template>
<script>
import { getProjectList } from "@/api/project";
import { isPhone } from "@/utils/common.js";
export default {
  name: "projectLink",
  props: {
    labelWidth: {
      type: String,
      default: "90px",
    },
    labelTitle: {
      type: String,
      default: "负责项目",
    },
    defaultIndex: {
      type: Array,
      default: () => [],
    },
    defaultName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      loading: false,
      finished: false,
      showPopup: false,
      reloadgroup: false,
      infoList: [],
      ResponsibleProjects: [],
      ResponsibleProjectsName: [],
      IsEnableIdCard: [], // 判断是否需要身份证
      checkProject: [],
      showTag: false,
      ProjectName: "",
    };
  },
  computed: {
    setlabelWidth() {
      let labelWidth = Number(this.labelWidth.replace(/[a-zA-Z]+/g, ""));
      let conversion = (labelWidth / 37.5).toFixed(1) + "rem";
      return conversion;
    },
    popupClass() {
      if (isPhone()) {
        return {
          width: "60%",
          height: "100%",
        };
      } else {
        return {
          width: "30%",
          height: "100%",
        };
      }
    },
  },
  mounted() {
    this.changeDropdown();
  },
  watch: {
    ProjectName() {
      if (this.ProjectName.length == 0) {
        this.changeDropdown();
      }
    },
  },
  methods: {
    openDetail(item) {},
    onLoad() {},
    toggle(index) {
      if (!this.$refs.checkboxes[index].disabled) {
        this.$refs.checkboxes[index].toggle();
      }
    },
    changeDropdown() {
      this.reloadgroup = false;
      this.loading = true;
      getProjectList({
        ProjectName: this.ProjectName,
        Area: "",
        orderType: 1,
        PageIndex: 1,
        PageSize: 100,
      })
        .then((data) => {
          if (this.checkProject.length > 0) {
            // 利用reduce方法遍历数组,reduce第一个参数是遍历需要执行的函数，第二个参数是item的初始值
            let obj = {};
            let listData = this.checkProject.concat(data.Result);
            this.infoList = listData.reduce(function (item, next) {
              obj[next.Id] ? "" : (obj[next.Id] = true && item.push(next));
              return item;
            }, []);
          } else {
            this.infoList = data.Result;
          }
          this.reloadgroup = true;
          this.loading = false;
          this.finished = true;

          if (this.defaultIndex.length > 0 && this.defaultName.length > 0) {
            this.ResponsibleProjects =
              this.ResponsibleProjects.length > 0
                ? Array.from(
                    new Set(this.ResponsibleProjects.concat(this.defaultIndex))
                  )
                : this.defaultIndex;

            this.ResponsibleProjectsName = [this.defaultName];
          }
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    // 处理数据
    changeCheck() {
      this.ResponsibleProjectsName =
        this.defaultName.length > 0 ? [].concat([this.defaultName]) : [];
      this.IsEnableIdCard = [];
      this.checkProject = [];
      // 获取名称
      this.infoList.map((item) => {
        this.ResponsibleProjects.find((value) => {
          if (value == item.Id) {
            this.checkProject.push(item);
            this.IsEnableIdCard.push(item.IsEnableIdCard);
            this.ResponsibleProjectsName.push(item.ProjectName);
          }
        });
      });
      if (this.ResponsibleProjectsName.length > 1) {
        this.showTag = true;
      } else {
        this.showTag = false;
      }
    },
    sureReport() {
      this.changeCheck();
      this.$emit("saveProject", {
        ResponsibleProjects: this.ResponsibleProjects,
        ResponsibleProjectsName: Array.from(
          new Set(this.ResponsibleProjectsName)
        ),
        IsEnableIdCard: this.IsEnableIdCard.indexOf(true) == 1 ? true : false,
      });
      // 关闭弹窗
      this.showPopup = false;
    },
    async searchData() {
      await this.changeCheck();
      await this.changeDropdown();
    },
  },
};
</script>
<style lang="less" scoped>
.reportLink {
  .inputClass {
    display: flex;
    width: 100%;
    align-items: center;
    .inputFlex {
      flex-grow: 1;
      .van-tag {
        margin-left: 10px;
      }
    }
    .van-icon {
      margin-right: 10px;
      color: #1989fa;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
.checkBox {
  height: 50px;
  align-items: center;
  padding-left: 60px;
}
.searchBox {
  height: 50px;
}
.checkListClass {
  // margin-top: 40px;
}
</style>