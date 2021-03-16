<template>
  <div class="Register">
    <div>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <h1>歡迎註冊</h1>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24" class="row">
          <el-input
            v-model="data.account"
            placeholder="請輸入帳號"
            @change="handleLogin"
          ></el-input>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24" class="row">
          <el-input
            v-model="data.email"
            placeholder="請輸入電子郵件"
          ></el-input>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24" class="row">
          <el-input v-model="data.name" placeholder="請輸入暱稱"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24" class="row">
          <el-input v-model="data.password" placeholder="請輸入密碼"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24" class="row">
          <el-input v-model="data.c_password" placeholder="密碼確認"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button @click="handleRegister">註冊</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "../router";
import { Store } from "vuex";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component({
  components: {},
})
export default class Register extends Vue {
  data = {
    password: "",
    email: "",
    account: "",
    name: "",
    c_password: "",
  };

  private loading: boolean = false;
  private message: string = "";

  @Auth.Getter
  private isLoggedIn!: boolean;

  @Auth.Action
  private register!: (data: any) => Promise<any>;
  @Auth.Action
  private login!: (data: any) => Promise<any>;

  @Auth.State("user")
  private currentUser!: any;

  mounted() {
    if (this.isLoggedIn) {
      this.$router.push("home");
    }
  }

  handleRegister() {
    this.loading = true;

    this.register(this.data).then(
      (data) => {
        this.login(this.data).then(() => {
          this.$router.push("home");
        });
      },
      (error) => {
        this.loading = false;
        this.message = error;
      }
    );
  }
}
</script>
<style lang="scss" scope>
.Register {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 97vh;
  overflow: hidden;

  .row {
    margin: 0 0 15px 0;
  }
}
</style>