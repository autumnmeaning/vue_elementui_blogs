<template>
  <div>
    <el-footer v-if="isFooter">Footer</el-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFooter: false,
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
  }
</style>

