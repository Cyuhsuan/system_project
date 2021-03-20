<template>
  <el-dialog
    title="商品管理"
    :visible.sync="visible"
    width="600px"
    :before-close="beforeClose"
  >
    <el-form label-position="top" label-width="80px">
      <el-form-item label="上傳商品圖片" class="photo-upload">
        <el-upload
          :action="domain"
          :multiple="false"
          :show-file-list="false"
          class="avatar-uploader"
          :headers="header"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          list-type="picture-card"
        >
          <img v-if="imageUrl" :src="dialogImageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品標題">
        <el-input
          placeholder="請輸入內容"
          v-model="form.title"
          style="margin-bottom: 15px"
          :disabled="loading"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="請輸入內容"
          v-model="form.description"
          style="margin-bottom: 15px"
          :disabled="loading"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="商品價格">
        <el-input
          type="number"
          placeholder="請輸入金額"
          v-model="form.price"
          style="margin-bottom: 15px"
          :disabled="loading"
        >
        </el-input>
      </el-form-item>
      <!-- <el-form-item label="商品描述">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item> -->
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
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

interface Form {
  description: string;
  fileUrl: string;
  title: string;
  id: number;
  price: number;
}

const defaultData = {
  description: "",
  fileUrl: "",
  title: "",
  id: 0,
  price: 0,
};

@Component({
  components: {},
})
export default class ProductionEditDialog extends Vue {
  public visible: boolean = false;
  public loading: boolean = false;

  public imageUrl: string = "";
  public dialogImageUrl: string = "";
  public dialogVisible: boolean = false;
  public file: any;

  public header = {
    Authorization: "",
  };

  public form: Form = {
    ...defaultData,
  };

  get domain() {
    return process.env.VUE_APP_API_URL + "production/photo-upload";
  }

  public open(item: any = null) {
    console.log(item);
    this.visible = true;
    const token = localStorage.getItem("token");
    this.header.Authorization = "Bearer " + token;
    this.form.title = item.title;
    this.form.description = item.description;
    this.form.fileUrl = item.photo_address;
    this.dialogImageUrl = item.fileUrl;
    this.imageUrl = item.photo_address;
    this.form.id = item.id;
    this.form.price = item.price;
    console.log(this.form);
  }

  public submit() {
    this.loading = true;
    this.form.fileUrl = this.imageUrl;
    const data = {
      ...this.form,
    };
    http
      .post("production/edit-photo-upload", data)
      .then((res) => {
        console.log(res);
        if (res.data.status === 1) {
          console.log(res);
          this.imageUrl = "";
          this.$emit("submit");
        }
      })
      .finally(() => {
        this.loading = false;
        this.close();
      });
  }

  public handleAvatarSuccess(res: any, file: any) {
    if (res.status === 1) {
      this.imageUrl = res.filepath;
      this.dialogImageUrl = process.env.VUE_APP_URL + "uploads/" + res.filepath;
    }
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

  public handlePictureCardPreview(file: any) {
    this.dialogImageUrl = file.url;
    this.dialogVisible = true;
  }

  public photoChange(file: any) {
    this.file = file;
    console.log("change", file);
  }

  public close() {
    if (this.imageUrl) {
      this.delete();
    }
    this.visible = false;
    this.dialogImageUrl = "";
    this.imageUrl = "";
    this.$emit("close");
  }

  public delete() {
    this.loading = true;
    const data = {
      ...this.form,
      fileUrl: this.imageUrl,
    };

    http
      .post("production/delete-photo-upload", data)
      .then((res: any) => {})
      .finally(() => {
        this.loading = false;
      });
  }

  public beforeClose() {
    this.close();
  }
}
</script>
<style lang="scss" scope>
</style>