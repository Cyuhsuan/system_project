<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import http from "../http-common";

@Component({
  components: {},
})
export default class About extends Vue {}
</script>