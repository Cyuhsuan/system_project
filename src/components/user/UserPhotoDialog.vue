<template>
  <el-dialog
    title="頭像編輯"
    :visible.sync="visible"
    width="30%"
    class="user-photo-dialog"
  >
    <el-form ref="form" v-model="form" :loading="loading">
      <el-upload
        :action="domain"
        :multiple="false"
        :headers="header"
        class="avatar-uploader"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        list-type="picture-card"
      >
        <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar" />
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <!-- <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog> -->
    </el-form>
    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="close()" :loading="loading">取消</el-button>
      <el-button type="primary" @click="submit()" :loading="loading"
        >確定</el-button
      >
    </span> -->
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
export default class UserPhotoDialog extends Vue {
  public visible: boolean = false;
  public loading: boolean = false;

  // 頭像
  public imageUrl: string = "";
  public dialogImageUrl: string = "";
  public dialogVisible: boolean = false;
  public file: any;

  get domain() {
    return process.env.VUE_APP_API_URL + "user/photo-upload";
  }
  // get domain() {
  //   return "http://laravel.test";
  // }
  @Auth.State
  private user!: any;

  @Auth.Action
  private userPhotoUpdate!: (data: any) => Promise<any>;

  public form: User = {
    name: "",
    email: "",
  };

  public header = {
    Authorization: "",
  };

  public open() {
    const token = localStorage.getItem("token");
    this.header.Authorization = "Bearer " + token;
    this.visible = true;
    this.form.name = this.user.name;
    this.form.email = this.user.email;
  }

  public close() {
    this.visible = false;
  }

  public submit() {
    this.loading = true;
    let formData = new FormData();
    formData.append("file", this.file);
    const data = {
      ...this.form,
      file: this.file,
    };

    http.post("user/photo-upload", formData).then((res) => {
      this.loading = false;
    });
  }

  public handleAvatarSuccess(res: any, file: any) {
    this.imageUrl = URL.createObjectURL(file.raw);
    this.userPhotoUpdate(res.filepath);
  }

  public beforeAvatarUpload(file: any) {
    this.file = file;
    const isJPG = file.type === "image/jpeg";
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
      this.$message.error("上傳格式為jpg");
    }
    if (!isLt2M) {
      this.$message.error("上傳圖片大小不可超過2M");
    }
    return isJPG && isLt2M;
  }

  public handleRemove(file: any, fileList: any) {
    console.log(file, fileList);
  }

  public handlePictureCardPreview(file: any) {
    this.dialogImageUrl = file.url;
    this.dialogVisible = true;
  }
}
</script>
<style lang="scss" scope>
.user-photo-dialog {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100%;
    height: 100%;
    line-height: 100%;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>