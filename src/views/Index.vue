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
      <el-row type="flex" justify="center">
        <el-col :span="24" class="row">
          <el-input v-model="data.email" placeholder="請輸入信箱"></el-input>
        </el-col>
      </el-row>
      <!-- <el-row type="flex" justify="center">
        <el-col :span="24" class="row">
          <el-input v-model="data.account" placeholder="請輸入帳號"></el-input>
        </el-col>
      </el-row> -->
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button @click="submit">登入</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import http from "../http-common";
import router from "../router";
import { Store } from "vuex";

@Component({
  components: {},
})
export default class Index extends Vue {
  data = {
    password: "",
    email: "",
    account: "",
  };

  public submit() {
    const data = this.data;
    http
      .post("login", data)
      .then((res) => {
        // 登入成功
        if (res.data.success) {
          const token = res.data.data.token;
          localStorage.setItem("token", token);
          this.$store.commit("addUser", res.data.data.user);
          router.push("home").then(()=>{
            window.location.reload();
          });
        }
      })
      .catch((res) => {
        // 登入失敗
        this.data.password = "";
        this.data.email = "";
      });
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