<template>
  <div class="home">
    <div class="form-title">
      <span> 重要通知 </span>
    </div>
    <el-row>
      <el-col>
        <el-card class="box-card" body-style="text-align:left; position:relative;">
          In this HTML tutorial, you will find more than 200 examples. With our
          online "Try it Yourself" editor, you can edit and test each example
          yourself!
          <div class="auther">admin</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">ss</el-col>
      <el-col :span="12">dd</el-col>
      <el-col :span="12">aa</el-col>
      <el-col :span="12">qq</el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import http from "../http-common";
import { Store } from "vuex";
import Header from "../components/Header.vue";

@Component({
  components: {
    Header,
  },
})
export default class Home extends Vue {
  public reverse = true;
  public activities = [
    {
      content: "活动按期开始",
      timestamp: "2018-04-15",
    },
    {
      content: "通过审核",
      timestamp: "2018-04-13",
    },
    {
      content: "创建成功",
      timestamp: "2018-04-11",
    },
  ];
}
</script>
<style lang="scss" scope>
.home {
  width: 100vw;
  min-height: 100vh;
  padding: 20px;

  .box-card {
    position:relative;

    .auther {
      position: absolute;
      bottom: 5px;
      right: 5px;
    }
  }
}

.form-title {
  text-align: left;
  margin-bottom: 15px;
}
</style>