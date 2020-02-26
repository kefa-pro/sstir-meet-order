<template>
  <div class="layout-main-wrapper">
    <page-header />
    <div class="main-content-wrapper">
      <breadcrumb />
      <div class="router-container">
        <router-view />
      </div>
    </div>
    <page-footer />
  </div>
</template>

<script>
import PageHeader from "@/components/page-header";
import Breadcrumb from "@/components/breadcrumb";
import PageFooter from "@/components/page-footer";

export default {
  name: "LayoutList",

  components: {
    PageHeader,
    Breadcrumb,
    PageFooter
  },

  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.layout-main-wrapper {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  box-sizing: border-box;

  .main-content-wrapper {
    width: 1200px;
    padding: 15px 0 15px 25px;
    box-sizing: border-box;

    .router-container {
      padding-top: 15px;
    }
  }
}
</style>
