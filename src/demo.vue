<template></template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import http from "@/services/HttpService";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component({
  components: {},
})
export default class demo extends Vue {}
</script>
<style lang="scss" scope>
</style>