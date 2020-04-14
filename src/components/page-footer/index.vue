<template>
  <div class="page-footer-wrapper">
    <div class="content-wrapper">
      <div class="text-wrapper">
        <p class="title">使用说明</p>
        <p class="content">
          1. 建议使用Chrome浏览器访问会议URL参加会议，以获得最佳体验。
        </p>
        <p class="content">
          2. 请填写真实的个人信息，手机和邮箱至少填写一个，以便我们发送会议地址。
        </p>
         <p class="content">
          3. 因资源有限，部分时段可能会因为已经被约满导致无法预约，敬请谅解。
        </p>
      </div>
      <div class="qrcode">
        <img :src="QrCode" />
      </div>
    </div>
  </div>
</template>

<script>
import QrCode from "./img/qrcode.png";

export default {
  name: "PageFooter",

  data() {
    return {
      QrCode
    };
  }
};
</script>

<style scoped lang="less">
.page-footer-wrapper {
  width: 100%;
  height: 130px;
  background: #898989;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;

  .content-wrapper {
    width: 1200px;
    padding-left: 25px;
    box-sizing: border-box;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    .text-wrapper {
      height: 80px;
      padding-right: 40px;
      color: #fff;

      .title {
        font-size: 16px;
        font-weight: 700;
        padding-bottom: 10px;
      }
      .content {
        font-size: 14px;
        line-height: 24px;
      }
    }
    .qrcode {
      height: 80px;
      img {
        width: 80px;
        height: 80px;
      }
    }
  }
}
</style>
