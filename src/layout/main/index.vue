<template>
  <div class="layout-main-wrapper">
    <page-header />
    <div style="background: #fff; height: 20px; width: 100%;" />
    <page-tab />
    <div class="main-content-wrapper">
      <div class="router-container">
        <router-view />
      </div>
    </div>
    <page-footer />
  </div>
</template>

<script>
import PageHeader from "@/components/page-header";
import PageTab from "@/components/page-tab";
import PageFooter from "@/components/page-footer";

export default {
  name: "LayoutMain",

  components: {
    PageHeader,
    PageTab,
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
