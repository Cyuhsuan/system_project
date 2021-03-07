<template>
  <div class="messageBoard">
    <h1>留言板</h1>
    <el-input
      type="textarea"
      :rows="2"
      placeholder="請輸入內容"
      v-model="data.message"
      style="margin-bottom: 15px"
      :disabled="loading"
    >
    </el-input>
    <el-row type="flex" justify="end">
      <el-button size="mini" @click="clear()" :loading="loading"
        >清除</el-button
      >
      <el-button size="mini" type="primary" @click="submit()" :loading="loading"
        >確認</el-button
      >
    </el-row>
    <hr />
    <h1>留言紀錄</h1>
    <el-timeline :reverse="true" :loading="loading">
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
          <div class="reply text-gray">回應: {{ item.replyCount }}</div>
          <div class="edit" v-if="item.user_id === user.id">
            <div @click="edit(item)">編輯</div>
            <div @click="remove(item)">刪除</div>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <MessageDialog ref="dialog" @submit="reload()" />
    <MessageEditDialog ref="editDialog" />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import http from "@/services/HttpService";
import MessageDialog from "@/components/message-board/MessageDialog.vue";
import MessageEditDialog from "@/components/message-board/MessageEditDialog.vue";
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
    MessageEditDialog,
  },
})
export default class MessageBoard extends Vue {
  public data = {
    message: "",
  };

  public $refs!: {
    dialog: MessageDialog;
    editDialog: MessageEditDialog;
  };

  @Auth.State
  private user!: any;
  @Auth.State
  private token!: string;

  public response = [];
  public loading: boolean = false;

  mounted() {
    this.reload();
  }

  public reload() {
    this.loading = true;
    http
      .get("message/index", {})
      .then((res: any) => {
        this.response = res.data;
        this.response.forEach((item: any) => {
          const isToday = this.isToday(item.date);
          item.isToday = isToday;
          if (isToday) {
            item.color = "rgb(245, 162, 8)";
          }

          if (item.isEdit) {
            item.date = item.date + " (已編輯)";
          }
          return item;
        });
      })
      .finally(() => {
        this.loading = false;
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
  }

  public toDetail(id: number) {
    this.$refs.dialog.open(id);
  }

  public remove(item: MessageItem) {
    console.log("delete", item);
    http.post("message/delete", item).then((res) => {
      this.reload();
    });
  }

  public edit(item: MessageItem) {
    this.$refs.editDialog.open(item);
  }
}
</script>
<style lang="scss" scope>
h1 {
  margin-top: 0;
}
</style>