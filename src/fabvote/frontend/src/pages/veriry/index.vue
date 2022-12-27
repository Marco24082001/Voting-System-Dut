<template>
  <div class="login">
    <el-card>
      <h2>Set password</h2>
      <el-form class="login-form" :model="model" :rules="rules" ref="form" @submit.enter.prevent="submit">
        <el-form-item prop="password">
          <el-input v-model="model.password" placeholder="password" type="password" :prefix-icon="icon.lock">
          </el-input>
        </el-form-item>
        <el-form-item prop="re-password">
          <el-input v-model="model.re_password" placeholder="Password" type="password" :prefix-icon="icon.lock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" class="login-button" type="primary" native-type="submit" block>Submit</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
  
<script>
import { User, Lock } from "@element-plus/icons-vue"
import { ElMessage } from "element-plus";
import { mapState } from "vuex";
import VoterService from '@/services/voter/voter.services';
export default {
  name: "verify_page",
  props: {
    email: {
      type: String,
      default: "",
    },
    token: {
      type: String,
      default: "",
    }
  },
  data() {
    return {
      validCredentials: {
        password: "lightscope",
        re_password: "lightscope"
      },
      model: {
        password: "adminpw",
        re_password: "adminpw"
      },
      icon: {
        user: User,
        lock: Lock
      },
      loading: false,
      rules: {
        password: [
          {
            required: true,
            message: "password is required",
            trigger: "blur"
          },
          {
            min: 4,
            message: "password length should be at least 5 characters",
            trigger: "blur"
          }
        ],
        re_password: [
          {
            required: true,
            message: "Password is required", trigger: "blur"
          },
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
    async validatePassword() {
      let valid = await this.$refs.form.validate();
      if (valid) {
        if (this.model.password === this.model.re_password) {
          return true;
        }
        ElMessage.error('Password not match!')
      }
      return false;
    },
    async submit() {
      let valid = await this.validatePassword();
      if (!valid) {
        return;
      }
      this.$store.commit("animation/setFullscreenLoading", true);
      const res = await VoterService.verify(this.email, this.token, this.model.password);
      this.$store.commit("animation/setFullscreenLoading", false);
      if (!res.data.error) {
        this.$router.push("/login");
      }
      console.log(res);
    }
  }
};
</script>
    
<style lang="scss" scoped>
.login {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 100vh;
}

.login-button {
  width: 100%;
  margin-top: 40px;
}
.login-form {
  width: 290px;
}
.forgot-password {
  margin-top: 10px;
}
$teal: rgb(0, 124, 137);
.el-button--primary {
  background: $teal;
  border-color: $teal;

  &:hover,
  &.active,
  &:focus {
    background: lighten($teal, 7);
    border-color: lighten($teal, 7);
  }
}
.login .el-input__inner:hover {
  border-color: $teal;
}
.login .el-input__prefix {
  background: rgb(238, 237, 234);
  left: 0;
  height: calc(100% - 2px);
  left: 1px;
  top: 1px;
  border-radius: 3px;
  .el-input__icon {
    width: 30px;
  }
}
.login .el-input input {
  padding-left: 35px;
}
.login .el-card {
  padding-top: 0;
  padding-bottom: 30px;
}
h2 {
  font-family: "Open Sans";
  letter-spacing: 1px;
  font-family: Roboto, sans-serif;
  padding-bottom: 20px;
}
a {
  color: $teal;
  text-decoration: none;
  &:hover,
  &:active,
  &:focus {
    color: lighten($teal, 7);
  }
}
.login .el-card {
  width: 340px;
  display: flex;
  justify-content: center;
}
</style>
    