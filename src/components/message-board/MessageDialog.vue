<template>
  <el-dialog :visible.sync="visible" width="650px" class="message-dialog">
    <el-card class="box-card message-card content">
      {{ response.content }}
      <div class="auther text-gray">- {{ response.user.name }}</div>
      <div class="date text-gray">{{ response.date }}</div>
    </el-card>
    <div class="reply-contain" v-if="response.replies.length > 0">
      <el-row
        v-for="(item, index) in response.replies"
        :key="index"
        style="margin-bottom: 5px"
      >
        <el-row :gutter="10" v-if="item.user_id !== user.id">
          <el-col :span="16" class="other message-card">
            {{ item.content }}
            <div class="auther text-gray">- {{ item.user.name }}</div>
            <div class="date text-gray">{{ item.date }}</div>
          </el-col>
          <el-col :span="8"></el-col>
        </el-row>

        <el-row :gutter="10" v-else>
          <el-col :span="8"> </el-col>
          <el-col :span="16" class="mine message-card">
            {{ item.content }}
            <div class="auther text-gray">- 自己</div>
            <div class="date text-gray">{{ item.date }}</div>
          </el-col>
        </el-row>
      </el-row>
    </div>
    <div v-else class="no-data">暫無回應</div>
    <hr />
    <span slot="footer" class="dialog-footer">
      <el-input
        type="textarea"
        :rows="1"
        placeholder="請輸入內容"
        style="margin-bottom: 15px"
        v-model="reply"
        :disabled="loading"
      >
      </el-input>
      <el-button size="mini" @click="dialogVisible = false">取消</el-button>
      <el-button size="mini" type="primary" @click="submit()">確定</el-button>
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
  replies: any;
  user: User;
}

interface User {
  account: string;
  name: string;
  id: number;
}

@Component({
  components: {},
})
export default class MessageDialog extends Vue {
  public visible: boolean = false;
  public response: MessageItem = {
    content: "",
    date: "",
    user_id: 0,
    id: 0,
    replies: [],
    user: {
      account: "",
      id: 0,
      name: "",
    },
  };
  public loading: boolean = false;
  public reply: string = "";

  @Auth.State
  private user!: any;

  public open(id: number) {
    this.visible = true;
    this.response = {
      content: "",
      date: "",
      user_id: 0,
      id: 0,
      replies: [],
      user: {
        account: "",
        id: 0,
        name: "",
      },
    };
    this.reload(id);
  }

  public reload(id: number) {
    this.loading = true;
    const data = {
      id: id,
    };
    http
      .get("message/find", data)
      .then((res: any) => {
        this.response = res.data[0];
      })
      .finally(() => {
        console.log(this.response);
        this.loading = false;
      });
  }

  public submit() {
    const data = {
      reply: this.reply,
      message_id: this.response.id,
    };

    http.post("message/reply/add", data).then((res: any) => {
      this.reply = "";
      this.reload(this.response.id);
    });
  }
}
</script>
<style lang="scss" scope>
.message-dialog {
  // position: relative;
  .content {
    margin-bottom: 20px;
  }

  .reply-contain {
    .el-col {
      border-radius: 5px;
      padding: 5px;
      padding-bottom: 20px;

      .text-gray {
        color: #555;
      }
    }

    .other {
      background: #d3dce6;
    }

    .mine {
      background: #e5e9f2;
    }
  }
}
</style>