<template>
  <div>
    <my-head></my-head>
    <el-container>
      <el-main>
        <div class="login-container">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px"
                   class="demo-ruleForm login-page">
            <h3 class="title">用户登录</h3>
            <el-form-item prop="username">
              <el-input type="text" v-model.number="ruleForm.username" autocomplete="off" placeholder="用户名">
                <template class="el-icon-user-solid"></template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="密码">
                <template class="el-icon-lock" slot="prepend"></template>
              </el-input>
            </el-form-item>

            <el-form-item style="width: 100%">
              <el-button type="primary" style="width: 100%" @click="submitForm('ruleForm')" round>登录</el-button>
            </el-form-item>
            <el-form-item property="checked">
              <el-checkbox v-model="ruleForm.checked" class="rememberme">记住密码</el-checkbox>
              <router-link to="">忘记密码？</router-link>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import axios from "axios";
  import ElForm from "../../node_modules/element-ui/packages/form/src/form";
  import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item";
  export default {
    components: {
      ElFormItem,
      ElForm
    },
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
      };
      return {
        ruleForm: {
          username: '',
          password: '',
          checked: false
        },
        rules: {
          password: [
            {validator: validatePass, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        var username = this.ruleForm.username;
        var password = this.ruleForm.password;
        var checked = this.ruleForm.checked;

        axios.post("http://localhost:8080/Login", {
          username: username,
          password: password
        }).then(res => {
          if (res.data === "failed") {
            this.$notify.info({
              title: '系统维护中',
            });
          } else if (res.data === "unkmown") {
            this.$notify({
              title: '当前用户不存在',
              type: 'warning'
            });
          } else if (res.data === "mistake") {
            this.$notify.error({
              title: '密码错误',
            });
          } else {
            this.$notify({
              title: '登录成功',
              type: 'success'
            })
            alert(res.data)
            this.$cookies.set("user", res.data);
            this.$cookies.set("password", this.password);
            let user = this.$cookies.get("user");
            alert(user);
            alert(password);
            this.$router.push({path: '/'});
          }
        })
      }
    }
  }
</script>

<style scoped>
  .login-container {
    width: 100%;
    height: 540px;
    border: white 1px;
  }

  .login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 100px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
  }
</style>
