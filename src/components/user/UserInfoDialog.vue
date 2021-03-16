<template>
  <el-dialog
    title="用戶編輯"
    :visible.sync="visible"
    width="30%"
    class="user-info-dialog"
  >
    <el-form ref="form" v-model="form" :loading="loading">
      <el-form-item label="暱稱">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="電子郵件">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close()" :loading="loading">取消</el-button>
      <el-button type="primary" @click="submit()" :loading="loading"
        >確定</el-button
      >
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import http from "@/services/HttpService";
import router from "@/router";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

interface User {
  name: string;
  email: string;
}

@Component({
  components: {},
})
export default class UserInfoDialog extends Vue {
  public visible: boolean = false;
  public loading: boolean = false;

  @Auth.State
  private user!: any;

  @Auth.Action
  private userEditUpdate!: (data:any) => void;

  public form: User = {
    name: "",
    email: "",
  };

  public open() {
    this.visible = true;
    this.form.name = this.user.name;
    this.form.email = this.user.email;
  }

  public close() {
    this.visible = false;
  }

  public submit() {
    this.loading = true;
    const data = this.form;

    http.post("user/edit", data).then((res) => {
      this.loading = false;
      this.userEditUpdate(this.form);
    });
  }
}
</script>
<style lang="scss" scope>
</style>