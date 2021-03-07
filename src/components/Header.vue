<template>
  <el-menu
    :default-active="defaultIndex"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    with="100%"
    class="header"
  >
    <el-submenu index="1">
      <template slot="title">
        <div class="user-info"></div>
        <el-avatar :size="40"></el-avatar>
        <span style="margin-left: 15px">
          {{ user.name }}
        </span>
      </template>
      <el-menu-item index="1-1" @click="openInfoDialog()"
        >用戶編輯</el-menu-item
      >
      <el-menu-item index="1-2" @click="openPasswordDialog()"
        >密碼編輯</el-menu-item
      >
    </el-submenu>
    <el-menu-item>
      <el-button @click="logout()" size="mini">登出</el-button>
    </el-menu-item>
    <UserInfoDialog ref="infoDialog" />
    <UserPasswordDialog ref="passwordDialog" />
  </el-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import UserInfoDialog from "@/components/user/UserInfoDialog.vue";
import UserPasswordDialog from "@/components/user/UserPasswordDialog.vue";
import http from "@/http-common";
import router from "@/router";
import { Store } from "vuex";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component({
  components: {
    UserInfoDialog,
    UserPasswordDialog,
  },
})
export default class Header extends Vue {
  public defaultIndex = "1";
  public loading: boolean = false;

  public $refs!: {
    infoDialog: UserInfoDialog;
    passwordDialog: UserPasswordDialog;
  };

  @Auth.Action
  private signOut!: () => void;

  @Auth.State
  private user!: any;

  public logout() {
    this.signOut();
    router.push("/");
  }

  public openInfoDialog() {
    this.$refs.infoDialog.open();
    // this.visible = true;
  }
  public openPasswordDialog() {
    this.$refs.passwordDialog.open();
    // this.visible = true;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin-left: 15px;
    color: #fff;
  }
}
</style>
