<template>
  <div class="login">
    <el-card>
      <h2>Login</h2>
      <el-form
        class="login-form"
        :model="model"
        :rules="rules"
        ref="form"
        @submit.enter.prevent="login"
      >
        <el-form-item prop="username">
          <el-input v-model="model.username" placeholder="Username" :prefix-icon="icon.user">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="model.password"
            placeholder="Password"
            type="password"
            :prefix-icon="icon.lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            native-type="submit"
            block
          >Login</el-button>
        </el-form-item>
        <a class="forgot-password" href="https://oxfordinformatics.com/">Forgot password ?</a>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { User, Lock } from '@element-plus/icons-vue'
export default {
  name: "login_page",
  data() {
    return {
      validCredentials: {
        username: "lightscope",
        password: "lightscope"
      },
      model: {
        username: "",
        password: ""
      },
      icon: {
        user: User,
        lock: Lock
      },
      loading: false,
      rules: {
        username: [
          {
            required: true,
            message: "Username is required",
            trigger: "blur"
          },
          {
            min: 4,
            message: "Username length should be at least 5 characters",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "Password is required", trigger: "blur" },
          {
            min: 5,
            message: "Password length should be at least 5 characters",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    simulateLogin() {
      return new Promise(resolve => {
        setTimeout(resolve, 800);
      });
    },
    async login() {
      let valid = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      this.loading = true;
      await this.simulateLogin();
      this.loading = false;
      if (
        this.model.username === this.validCredentials.username &&
        this.model.password === this.validCredentials.password
      ) {
        this.$message.success("Login successfull");
      } else {
        this.$message.error("Username or password is invalid");
      }
    }
  }
};
</script>
  
<style lang="scss" scoped>
  @import './style.scss';
</style>
  