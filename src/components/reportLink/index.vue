<template>
  <div class="reportLink">
    <van-field v-model="searchForm.Q" center clearable label="关联项目">
      <template #input>
        <div>
          测试数据
          <van-tag type="primary">+3</van-tag>
        </div>
      </template>
    </van-field>
  </div>
</template>
<script>
export default {
  name: "reportLink",
  props: {
    buildList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    openDetail(item) {}
  }
};
</script>
<style lang="less" scoped>
.reportLink {
}
</style>