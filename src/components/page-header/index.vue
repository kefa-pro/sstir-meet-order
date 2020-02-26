<template>
  <header class="page-header-wrapper">
    <div class="content">
      <div class="logo">
        <img :src="Logo" alt="sstir" @click="onLogoClick" />
      </div>
    </div>
  </header>
</template>

<script>
import Logo from "./img/logo.png";

export default {
  name: "PageHeader",

  data() {
    return {
      Logo
    };
  },

  methods: {
    onLogoClick() {
      window.open("http://www.sstir.cn", "_blank");
    }
  }
};
</script>

<style lang="less" scoped>
.page-header-wrapper {
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.11);

  .content {
    width: 1200px;
    box-sizing: border-box;
    height: 60px;
    padding-left: 25px;
    .logo {
      height: 60px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      img {
        height: 40px;
        cursor: pointer;
      }
    }
  }
}
</style>
