<template>
  <div class="header">
    <el-button @click="logout()">登出</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import http from "../http-common";
import router from "../router";
import { Store } from "vuex";

@Component
export default class HelloWorld extends Vue {
  public logout() {
    http.post("logout").then((res) => {
      // localStorage.removeItem("token");
      this.$store.commit("removeUser");
      router.push("/");
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
