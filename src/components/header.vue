<template>
  <div>
    <el-header>

      <div>
        <div class="login-register">
          <div>
            <router-link to="/login" @click="toLogin()">登录</router-link>
            /
            <router-link to="/register" @click="toLogin()">注册</router-link>
          </div>
        </div>
      </div>
    </el-header>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
  }
  .login-register {
    position: fixed;
    top: 0px;
    right: 10px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
</style>
