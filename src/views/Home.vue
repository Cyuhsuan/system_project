<template>
  <div class="home">
    <div class="form-title">
      <span> 重要訊息 </span>
    </div>
    <el-row>
      <el-col>
        <el-card
          class="box-card pointer message-card"
          body-style="text-align:left; position:relative;"
        >
          <div class="message-click" @click="toMessageBoard()"></div>
            歡迎使用此系統,一切功能正在開發中,可測試使用者相關功能跟留言系統
          <div class="auther">— 開發者 <span> 2020/03/20</span></div>
        </el-card>
      </el-col>
    </el-row>
    <!-- <el-row :gutter="10">
      <el-col :span="12">ss</el-col>
      <el-col :span="12">dd</el-col>
      <el-col :span="12">aa</el-col>
      <el-col :span="12">qq</el-col>
    </el-row> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import http from "../http-common";
import { Store } from "vuex";
import Header from "../components/Header.vue";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component({
  components: {
    Header,
  },
})
export default class Home extends Vue {
  @Auth.State("user")
  private currentUser!: any;

  // mounted() {
  //   if (!this.currentUser) {
  //     this.$router.push("/login");
  //   }
  // }

  public toMessageBoard() {
    console.log("ss");
    this.$router.push("message-board");
  }
}
</script>
<style lang="scss" scope>
.home {
  .box-card {
    span {
      font-size: 12px;
      color: rgb(153, 153, 153);
    }
  }
}

.form-title {
  text-align: left;
  margin-bottom: 15px;
}
</style>