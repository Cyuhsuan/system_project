<template>
  <div class="about">
    <h1>This is an home page</h1>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import http from "../http-common";

@Component({
  components: {},
})
export default class Home extends Vue {}
</script>