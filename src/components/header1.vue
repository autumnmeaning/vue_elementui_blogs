<template>
  <div>
    <el-header>
      <div>
        <div class="demo-type">
          <div>
            <span>{{user.username}}</span>
            <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar src="http://qfasj77k7.hn-bkt.clouddn.com/moren.jpg"></el-avatar>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人资料</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item @click="quit()">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="write-page">
          <router-link to="/write">
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
          </router-link>
        </div>
      </div>
    </el-header>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        user: ''
      }
    },
    methods: {
        quit() {
          alert(111);
          this.$cookies.remove("user");
          this.$router.push({path: '/'});
          console.log(this.$cookies.get("user"));
        }
    },
    created() {
      let username = this.$cookies.get("user");
      axios.get("http://localhost:8080/GetUserByUsername/" + username).then(res => {
        this.user = res.data;
      })
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

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .write-page {
    position: fixed;
    right: 120px;
    top: 0px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
