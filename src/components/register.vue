<template>
  <el-container>
    <el-header>
      <div>
        head
      </div>
    </el-header>
    <el-main>
      <div class="left-page">
        images
      </div>
      <div class="register-container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm register-page">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="tel">
            <el-input type="text" v-model="ruleForm.tel"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input type="text" v-model="ruleForm.email"></el-input>
            <el-button type="primary" @click="checkCode()" round>获取验证码</el-button>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input type="text" v-model="ruleForm.code"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
    <el-footer>Footer</el-footer>

  </el-container>

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
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          username: '',
          password: '',
          checkPass: '',
          tel: '',
          email: '',
          code: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {validator: validatePass, trigger: 'blur'},
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' },
            {required: true, message: '请确认密码', trigger: 'blur'}
          ],
          tel: [
            {required: true, message: '请输入联系方式', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ],
        }
      };
    },
    methods: {
      checkCode: function () {
        axios.get("http://localhost:8080/SendMail?email=" + this.ruleForm.email).then(res => {
          if (res.data === "success") {
            this.$message({
              message: '邮件发送成功',
              type: 'success'
            });
          } else {
            this.$message.error('邮件发送失败');
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post("http://localhost:8080/Register", this.ruleForm).then(res => {
              if (res.data === "success") {
                  alert("注册成功");
              } else if (res.data === "failed"){
                  alert("注册失败");
              } else {
                  alert("系统维护中");
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .register-container {
    width: 100%;
    height: 540px;
    border: white 1px;
  }

  .left-page {
    margin: 10px auto;
    width: 500px;
    padding: 35px 35px 15px;
    background: #fff;
    position: fixed;
    left: 190px;
    border-right: solid black 2px;
  }

  .register-page {
    margin: 10px auto;
    width: 500px;
    height: 400px;
    padding: 35px 35px 15px;
    background: #fff;
    position: fixed;
    right: 190px;
  }

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
