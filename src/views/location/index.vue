<template>
  <div class="mainContent">
    <div class="searchForm">
      <van-cell-group>
        <van-field-select-picker
          label="状态"
          placeholder="请选择"
          v-model="satelabel"
          :columns="hanlersateList"
        />
        <van-field v-model="searchForm.cruxValue" label="搜索关键词" placeholder="多个关键字之间用空格隔开" />
        <van-row>
          <van-col span="14">
            <van-field
              :value="searchForm.timeStart"
              label="报备日期"
              placeholder="开始"
              @click="timeStart = true"
            />
            <van-calendar v-model="timeStart" title="开始" @confirm="onConfirm" />
          </van-col>
          <van-col span="2" class="spiltRow">-</van-col>
          <van-col span="8">
            <van-field :value="searchForm.timeEnd" placeholder="截至" @click="timeEnd = true" />
            <van-calendar v-model="timeEnd" title="截至" @confirm="onConfirm"/>
          </van-col>
        </van-row>
      </van-cell-group>

      <van-row class="controlBox">
        <van-button class="buttonRight" type="info" size="small" @click="postSearch">查询</van-button>
      </van-row>
    </div>
  </div>
</template>
<script>
import VanFieldSelectPicker from "../../components/VanFieldSelectPicker";
export default {
  name: "location",
  components: {
    VanFieldSelectPicker
  },
  data() {
    return {
      satelabel: "请选择",
      timeStart: false,
      timeEnd: false,
      searchForm: {
        stateValue: "",
        cruxValue: "",
        timeStart: "",
        timeEnd: ""
      },
      sateList: [
        {
          value: "",
          label: "请选择"
        },
        {
          value: "1",
          label: "界定中"
        },
        {
          value: "2",
          label: "有效推荐"
        },
        {
          value: "3",
          label: "无效推荐"
        },
        {
          value: "4",
          label: "有效带看"
        },
        {
          value: "5",
          label: "有效到访"
        },
        {
          value: "6",
          label: "认筹"
        },
        {
          value: "7",
          label: "认购"
        },
        {
          value: "8",
          label: "成交"
        }
      ]
    };
  },
  computed: {
    hanlersateList() {
      let label = [];
      label = this.sateList.map(item => {
        return item.label;
      });
      return label;
    }
  },
  watch: {
    satelabel() {
      this.searchForm = this.sateList.find(
        item => item.label == this.satelabel
      ).value;
    }
  },
  mounted() {
    // console.log(this.hanlersateList);
  },
  methods: {
    onConfirm(value) {
      console.log(value);
      this.timeStart = false;
    },
    postSearch() {}
  }
};
</script>
<style lang="scss" scoped>
.searchForm {
  padding: 18px 0;
  .spiltRow {
    text-align: center;
    line-height: 28px;
  }
}
</style>