<template>
  <div class="reportLink">
    <van-field center clearable label="负责项目" :label-width="labelWidth" @click="showPopup = true">
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
      :style="{ width: '60%',height:'100%' }"
      closeable
      close-icon-position="top-left"
      get-container="body"
    >
      <van-row class="checkBox" type="flex" justify="left">
        <van-button class="buttonRight" type="info" size="mini" @click="sureReport()">确定</van-button>
        <!-- <van-button class="buttonRight" type="info" size="mini" @click="checkAll(true)">全选</van-button>
        <van-button class="buttonRight" type="info" size="mini" @click="checkAll(false)">全不选</van-button>-->
      </van-row>
      <van-list
        class="checkListClass"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-checkbox-group v-model="ResponsibleProjects">
          <van-cell-group>
            <van-cell
              v-for="(item, index) in infoList"
              clickable
              :key="item.Id"
              :title="`${item.ProjectName}`"
              @click="toggle(index)"
            >
              <template #right-icon>
                <van-checkbox shape="square" :name="item.Id" ref="checkboxes" />
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
export default {
  name: "reportLink",
  props: {
    labelWidth: {
      type: String,
      default: "180px"
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      showPopup: false,
      infoList: [],
      ResponsibleProjects: [],
      ResponsibleProjectsName: [],
      showTag: false
    };
  },
  mounted() {
    this.changeDropdown();
  },
  watch: {
    infoList() {
      // console.log(this.infoList);
    }
  },
  methods: {
    openDetail(item) {},
    onLoad() {},
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    changeDropdown() {
      getProjectList({
        ProjectName: "",
        Area: "",
        orderType: 1
      })
        .then(data => {
          this.infoList = data.Result;
          this.loading = true;
          this.finished = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    sureReport() {
      this.ResponsibleProjectsName = [];
      // 获取名称
      this.infoList.map(item => {
        this.ResponsibleProjects.find(value => {
          if (value == item.Id) {
            this.ResponsibleProjectsName.push(item.ProjectName);
          }
        });
      });
      if (this.ResponsibleProjectsName.length > 1) {
        this.showTag = true;
      } else {
        this.showTag = false;
      }
      this.$emit("saveProject", {
        ResponsibleProjects: this.ResponsibleProjects,
        ResponsibleProjectsName: this.ResponsibleProjectsName
      });
      // 关闭弹窗
      this.showPopup = false;
    },
    checkAll(type) {
      if (type) {
        this.ResponsibleProjects = this.infoList.map(item => {
          return item.Id;
        });
      } else {
        this.ResponsibleProjects = [];
      }
    }
  }
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
.checkListClass {
  // margin-top: 40px;
}
</style>