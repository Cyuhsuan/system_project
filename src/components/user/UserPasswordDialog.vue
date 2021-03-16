<template>
  <el-dialog title="密碼編輯" :visible.sync="visible" width="30%">
    <el-form ref="form" v-model="form" :loading="loading">
      <el-form-item label="舊密碼">
        <el-input v-model="form.old_password"></el-input>
      </el-form-item>
      <el-form-item label="新密碼">
        <el-input v-model="form.new_password"></el-input>
      </el-form-item>
      <el-form-item label="密碼驗證">
        <el-input v-model="form.confirm_password"></el-input>
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

interface Form {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

const defaultFrom: Form = {
  old_password: "",
  new_password: "",
  confirm_password: "",
};

@Component({
  components: {},
})
export default class UserPasswordDialog extends Vue {
  public visible: boolean = false;
  public loading: boolean = false;

  @Auth.State
  private user!: any;

  @Auth.Action
  private signOut!: () => void;

  public form = {
    ...defaultFrom,
  };

  public open() {
    this.visible = true;
  }

  public close() {
    this.visible = false;
  }

  public submit() {
    this.loading = true;
    const data = this.form;
    http
      .post("user/password-edit", data)
      .then((res) => {
        this.loading = false;
      })
      .finally(() => {
        this.signOut();
        router.push("/");
      });
  }
}
</script>
<style lang="scss" scope>
</style>