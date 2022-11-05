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
        <el-form-item prop="accountname">
          <el-input v-model="model.accountname" placeholder="accountname" :prefix-icon="icon.user">
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
          <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            native-type="submit"
            block
          >{{user.counter}}</el-button>
        </el-form-item>
        <a class="forgot-password" href="https://oxfordinformatics.com/">Forgot password ?</a>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { User, Lock } from "@element-plus/icons-vue"
import { mapState } from "vuex";
import AuthenticationService from "@/services/authentication/authentication.services";
export default {
  name: "login_page",
  data() {
    return {
      validCredentials: {
        accountname: "lightscope",
        password: "lightscope"
      },
      model: {
        accountname: "admin@gmai.com",
        password: "adminpw"
      },
      icon: {
        user: User,
        lock: Lock
      },
      loading: false,
      rules: {
        accountname: [
          {
            required: true,
            message: "accountname is required",
            trigger: "blur"
          },
          {
            min: 4,
            message: "accountname length should be at least 5 characters",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "Password is required", trigger: "blur" },
          {
            min: 4,
            message: "Password length should be at least 5 characters",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState(["user"])
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
      const res = await AuthenticationService.login(this.model);
      if(!res.data.error) {
        this.$router.push("/");
      }
      console.log(res);
    }
  }
};
</script>
  
<style lang="scss" scoped>
  @import "./style.scss";
</style>
  