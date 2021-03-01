<template>
  <div class="index">
    <div>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <h1>管理系統</h1>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24" class="row">
          <el-input v-model="data.password" placeholder="請輸入密碼"></el-input>
        </el-col>
      </el-row>
      <!-- <el-row type="flex" justify="center">
        <el-col :span="24" class="row">
          <el-input v-model="data.email" placeholder="請輸入信箱"></el-input>
        </el-col>
      </el-row> -->
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
        <el-col :span="6">
          <el-button @click="handleLogin">登入</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import http from "../http-common";
import router from "../router";
import { Store } from "vuex";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component({
  components: {},
})
export default class Index extends Vue {
  data = {
    password: "",
    email: "",
    account: "",
  };

  private loading: boolean = false;
  private message: string = "";

  @Auth.Getter
  private isLoggedIn!: boolean;

  @Auth.Action
  private login!: (data: any) => Promise<any>;

  @Auth.State("user")
  private currentUser!: any;

  mounted() {
    if (this.isLoggedIn) {
      this.$router.push("home");
    }
  }

  handleLogin() {
    this.loading = true;

    this.login(this.data).then(
      (data) => {
        this.$router.push("home");
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
.index {
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