<template>
  <el-dialog title="詳細留言" :visible.sync="visible" width="30%">
    <div></div>
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
export default class MessageDialog extends Vue {
  public visible: boolean = false;

  public open() {
    this.visible = true;
  }
}
</script>
<style lang="scss" scope>
</style>