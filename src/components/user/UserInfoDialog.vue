<template>
  <el-dialog
    title="用戶編輯"
    :visible.sync="visible"
    width="30%"
    :before-close="handleClose"
  >
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="dialogVisible = false">確定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import http from "@/http-common";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component({
  components: {},
})
export default class UserInfoDialog extends Vue {
  public visible: boolean = false;

  public open (){
    this.visible = true;
  }
}
</script>
<style lang="scss" scope>
</style>