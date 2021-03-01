<template>
  <div class="aside">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1" @click="goToPage('home')">
        <i class="el-icon-s-home"></i>
        <span slot="title">首頁</span>
      </el-menu-item>
      <el-menu-item index="2" @click="goToPage('message-board')">
        <i class="el-icon-tickets"></i>
        <span slot="title">留言板</span>
      </el-menu-item>
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import http from "../http-common";
import { Store } from "vuex";
import router from "../router";

interface UserData {
  email: any;
  id: any;
  name: any;
}
@Component({
  components: {},
})
export default class Aside extends Vue {
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