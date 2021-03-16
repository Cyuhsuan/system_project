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
        <el-avatar :size="40" :fit="fit">
          <img :src="headerUrl" alt="" class="photo" />
        </el-avatar>

        <span style="margin-left: 15px">
          {{ user.name }}
        </span>
      </template>
      <el-menu-item index="1-1" @click="openPhotoDialog()"
        >頭像編輯</el-menu-item
      >
      <el-menu-item index="1-2" @click="openInfoDialog()"
        >用戶編輯</el-menu-item
      >
      <el-menu-item index="1-3" @click="openPasswordDialog()"
        >密碼編輯</el-menu-item
      >
    </el-submenu>
    <el-menu-item>
      <el-button @click="logout()" size="mini">登出</el-button>
    </el-menu-item>
    <UserInfoDialog ref="infoDialog" />
    <UserPhotoDialog ref="photoDialog" />
    <UserPasswordDialog ref="passwordDialog" />
  </el-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import UserInfoDialog from "@/components/user/UserInfoDialog.vue";
import UserPhotoDialog from "@/components/user/UserPhotoDialog.vue";
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
    UserPhotoDialog,
  },
})
export default class Header extends Vue {
  public defaultIndex = "1";
  public loading: boolean = false;
  public fit = "fill";

  public $refs!: {
    infoDialog: UserInfoDialog;
    passwordDialog: UserPasswordDialog;
    photoDialog: UserPhotoDialog;
  };

  @Auth.Action
  private signOut!: () => void;

  @Auth.State
  private user!: any;

  public logout() {
    this.signOut();
    router.push("/");
  }

  get headerUrl() {
    let url = process.env.VUE_APP_URL + "uploads/" + this.user.photo_address;
    if (!this.user.photo_address) {
      url =
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
    }
    return url;
  }

  public openInfoDialog() {
    this.$refs.infoDialog.open();
  }
  public openPasswordDialog() {
    this.$refs.passwordDialog.open();
  }

  public openPhotoDialog() {
    this.$refs.photoDialog.open();
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

  .photo {
    width: 100%;
    height: 100%;
    background-size: contain;
  }
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
