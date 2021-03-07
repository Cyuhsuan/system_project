<template>
  <div class="aside">
    <el-menu
      :default-active="curPage"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="home" @click="goToPage('home')">
        <i class="el-icon-s-home"></i>
        <span slot="title">首頁</span>
      </el-menu-item>
      <el-menu-item index="message-board" @click="goToPage('message-board')">
        <i class="el-icon-tickets"></i>
        <span slot="title">留言板</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Store } from "vuex";
import router from "../router";

@Component({
  components: {},
})
export default class Aside extends Vue {
  get curPage() {
    let path = this.$route.path;
    path = path.split("/")[1];
    console.log("path", path);
    return path;
  }
  public goToPage(page: string) {
    router.push(page);
  }
}
</script>
<style lang="scss" scope>
.aside {
  .el-menu-item {
    text-align: left;
  }
}
</style>