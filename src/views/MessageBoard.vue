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
    <el-timeline :reverse="true">
      <el-timeline-item
        v-for="(item, index) in response"
        :key="index"
        :timestamp="item.date"
        :color="item.color"
      >
        <!-- {{ item.content }} -->
        <el-card class="box-card pointer message-card">
          <div class="message-click" @click="toDetail(item.id)"></div>
          {{ item.content }}
          <div class="auther text-gray">- {{ item.user.name }}</div>
          <div class="edit" v-if="item.user_id === user.id">
            <div>編輯</div>
            <div @click="remove(item)">刪除</div>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <MessageDialog ref="dialog" />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
// import http from "@/http-common";
import http from "@/services/HttpService";
import MessageDialog from "@/components/message-board/MessageDialog.vue";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

interface MessageItem {
  content: string;
  date: string;
  user_id: number;
  id: number;
}

@Component({
  components: {
    MessageDialog,
  },
})
export default class MessageBoard extends Vue {
  public data = {
    message: "",
  };

  public $refs!: {
    dialog: MessageDialog;
  };

  @Auth.State
  private user!: any;
  @Auth.State
  private token!: string;

  public response = [];

  mounted() {
    console.log(this.user, this.token);
    this.reload();
  }

  public reload() {
    http.get("message/index", {}).then((res: any) => {
      console.log("test", res);
      this.response = res.data;
      this.response.forEach((item: any) => {
        const isToday = this.isToday(item.date);
        item.isToday = isToday;
        if (isToday) {
          item.color = "rgb(245, 162, 8)";
        }
        return item;
      });
      console.log(this.response);
    });
  }

  private isToday(date: string) {
    let d = new Date(date.replace(/-/g, "/"));
    let today = new Date();
    if (d.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
      return true;
    } else {
      return false;
    }
  }

  public clear() {
    this.data.message = "";
  }

  public submit() {
    let data = this.data;
    http.post("message/add", data).then((res) => {
      this.data.message = "";
      this.reload();
    });
    return console.log("dd");
  }

  public toDetail(id: number) {
    this.$refs.dialog.open();
  }

  public remove(item: MessageItem) {
    console.log("delete", item);
    http.post("message/delete", item).then((res) => {
      console.log(res);
    });
  }
}
</script>
<style lang="scss" scope>
h1 {
  margin-top: 0;
}
</style>