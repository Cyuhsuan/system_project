<template>
  <div class="messageBoard">
    <h1>留言板</h1>
    <el-input
      type="textarea"
      :rows="2"
      placeholder="請輸入內容"
      v-model="data.message"
      style="margin-bottom: 15px"
    >
    </el-input>
    <el-row type="flex" justify="end">
      <el-button size="mini" @click="clear()">清除</el-button>
      <el-button size="mini" type="primary" @click="submit()">確認</el-button>
    </el-row>
    <hr />
    <h1>留言紀錄</h1>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import http from "@/http-common";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component({
  components: {},
})
export default class MessageBoard extends Vue {
  public data = {
    message: "",
  };

  public clear() {
    this.data.message = "";
  }

  public submit() {
    let data = this.data;
    http.post("message/add", data).then((res)=>{
        console.log('sueecss');
    });
    return console.log("dd");
  }
}
</script>
<style lang="scss" scope>
h1 {
  margin-top: 0;
}
</style>