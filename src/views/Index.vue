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
import router from '../router'

@Component({
  components: {},
})
export default class Index extends Vue {
  data = {
    password: "",
    email: "",
  };

  public submit() {
    const data = this.data;
    console.log("http", http);
    http.post("login", data).then((res) => {
      console.log(res);
      // 登入成功
      if (res.data.success) {
        const token = res.data.success.token;
        localStorage.setItem("token", token);
        router.push('home');
      }
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