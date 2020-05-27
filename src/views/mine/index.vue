<template>
  <div>
    <van-cell title="修改密码" class="van-hairline--bottom" is-link @click="openchangepsd" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      showShare: false
    };
  },
  methods: {
    openchangepsd() {
      this.$router.push({
        name: "changePsd"
      });
    }
  }
};
</script>