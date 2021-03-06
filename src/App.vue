<template>
  <div id="app">
    <template v-if="isLoggedIn" name="el-fade-in-linear">
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-container>
          <el-aside width="200px">
            <Aside />
          </el-aside>
          <el-main>
            <router-view class="content" />
          </el-main>
        </el-container>
      </el-container>
    </template>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Header from "./components/Header.vue";
import Aside from "./components/Aside.vue";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component({
  components: {
    Header,
    Aside,
  },
})
export default class App extends Vue {
  @Auth.Getter
  private isLoggedIn!: boolean;
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
  overflow-y: hidden;
  min-width: 100vw;
  min-height: 100vh;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.content {
  width: 100%;
  min-height: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  // text-align: center;
  line-height: 60px;
  padding: 0 !important;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  // text-align: center;
  line-height: 200px;
}

.el-main {
  // background-color: #e9eef3;
  min-height: 100vh;
  color: #333;
  text-align: left;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
