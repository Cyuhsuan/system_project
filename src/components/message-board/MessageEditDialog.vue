<template>
  <el-dialog title="編輯" :visible.sync="visible" width="30%">
    <el-row>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="請輸入內容"
        v-model="data.content"
        style="margin-bottom: 15px"
        :disabled="loading"
      >
      </el-input>
    </el-row>
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

interface MessageItem {
  content: string;
  date: string;
  user_id: number;
  id: number;
}

const defaultData = {
  content: "",
  date: "",
  user_id: 0,
  id: 0,
};

@Component({
  components: {},
})
export default class MessageEditDialog extends Vue {
  public visible: boolean = false;
  public loading = false;

  public data: MessageItem = {
    ...defaultData,
  };

  public open(item: MessageItem) {
    this.visible = true;
    console.log(item);
    this.data = item;
  }

  public close() {
    this.visible = false;
  }

  public submit() {
    this.loading = true;
    const data = this.data;
    http.post("message/edit", data).then((res: any) => {
      this.loading = false;
      this.close();
      this.$emit('submit');
    });
  }
}
</script>
<style lang="scss" scope>
</style>