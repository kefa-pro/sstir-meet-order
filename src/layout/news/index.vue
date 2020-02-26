<template>
  <div class="layout-news-wrapper">
    <page-header />
    <div class="news-content-wrapper">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: `/home` }"
          >专栏首页</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: prePath }">{{
          preTitle
        }}</el-breadcrumb-item>
        <el-breadcrumb-item>热点追踪详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="router-container">
        <router-view />
      </div>
    </div>
    <page-footer />
  </div>
</template>

<script>
import PageHeader from "@/components/page-header";
import PageFooter from "@/components/page-footer";

export default {
  name: "LayoutList",

  components: {
    PageHeader,
    PageFooter
  },

  data() {
    return {};
  },

  computed: {
    prePath() {
      return this.$route.query.path;
    },

    preTitle() {
      return this.$route.query.name;
    }
  }
};
</script>

<style lang="less" scoped>
.layout-news-wrapper {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  box-sizing: border-box;

  .news-content-wrapper {
    width: 1200px;
    padding: 15px 0 15px 25px;
    box-sizing: border-box;

    .router-container {
      padding-top: 15px;
    }
  }
}
</style>
