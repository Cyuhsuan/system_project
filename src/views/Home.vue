<template>
  <div class="Home">
    <h1>使用者資料</h1>
    <div>{{ user }}</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import http from "../http-common";
import { Store } from 'vuex';

interface UserData {
  email: any;
  id: any;
  name: any;
}
@Component({})
export default class Header extends Vue {
  public data: any = {
    email: "",
    id: 0,
    name: "",
  };
  get user() {
    return this.$store.state.user;
  }
  // public data:any;
  mounted() {
    console.log('user',this.user);
  }
}
</script>
<style lang="scss" scope>
.home {
  width: 100vw;
  min-height: 100vh;
}
</style>