<template>
  <div class="productionUpdate">
    <h1>商品上架</h1>
    <el-row type="flex" justify="end">
      <el-button
        size="mini"
        type="primary"
        @click="editProduction()"
        :loading="loading"
        >新增</el-button
      >
    </el-row>
    <hr />
    <el-row :gutter="10">
      <el-col :span="12" v-for="(item, index) in response" :key="index">
        <el-card :body-style="{ padding: '0px' }" class="message-card pointer">
          <div class="message-click" @click="toDetail(item)"></div>
          <img :src="item.fileUrl" class="image" />
          <div style="padding: 14px">
            <h2>{{ item.title }}</h2>
            <div class="content ellipsis">{{ item.description }}</div>
            <div class="content ellipsis">${{ item.price }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <ProductionEditDialog
      ref="editDialog"
      @submit="reload()"
      @close="reload()"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import http from "@/services/HttpService";
import ProductionEditDialog from "@/components/production/ProductionEditDialog.vue";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component({
  components: {
    ProductionEditDialog,
  },
})
export default class ProductionUpdate extends Vue {
  public loading: boolean = false;
  public response = [];
  public $refs!: {
    editDialog: ProductionEditDialog;
  };

  mounted() {
    this.reload();
  }

  public reload() {
    this.loading = true;
    http
      .get("production/index", {})
      .then((res: any) => {
        this.response = res.data;
        this.response.forEach((item: any) => {
          item.fileUrl =
            process.env.VUE_APP_URL + "uploads/" + item.photo_address;
        });
        console.log(this.response);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  public editProduction() {
    this.$refs.editDialog.open();
  }

  public toDetail(item: any) {
    this.$refs.editDialog.open(item);
  }
}
</script>
<style lang="scss" scope>
.productionUpdate {
  .el-card {
    margin-bottom: 15px;

    img {
      width: 94%;
      height: 200px;
      background-position: center center;
      background-size: contain;
      margin: 5px 3%;
    }

    .content {
      height: 20px;
      width: 100%;
      padding: 0 5px;
    }
  }
}
</style>