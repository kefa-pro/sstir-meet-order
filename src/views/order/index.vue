<template>
  <div class="order-wrapper">
    <el-card class="box-card">
      <div slot="header" class="title">
        <h1>科云会议预约信息登记</h1>
      </div>
      <div class="form-wrapper">
        <el-form
          :model="orderInfo"
          :rules="rules"
          ref="form"
          label-width="100px"
        >
          <el-form-item label="姓名:">
            <el-input
              v-model="orderInfo.name"
              placeholder="请留下您的真实姓名"
              style="width: 400px;"
            />
          </el-form-item>
          <el-form-item label="单位:">
            <el-input
              v-model="orderInfo.company"
              placeholder="请留下您的工作单位"
              style="width: 400px;"
            />
          </el-form-item>
          <el-form-item label="手机:">
            <el-input
              v-model="orderInfo.mobile"
              placeholder="请填写真实手机号码，便于发送会议地址"
              style="width: 400px;"
            />
          </el-form-item>
          <el-form-item label="邮箱:">
            <el-input
              v-model="orderInfo.email"
              placeholder="请填写真实邮箱，便于发送会议地址"
              style="width: 400px;"
            />
          </el-form-item>
          <el-form-item label="会议时间:" prop="meet">
            <el-select
              v-model="orderInfo.meet"
              placeholder="请选择会议时间"
              style="width: 400px;"
            >
              <el-option
                v-for="item in meetingOpt"
                :key="item.id"
                :label="`${item.start} ~ ${item.end}`"
                :value="item.id"
                :disabled="!!item.disabled"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn">
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </div>
    </el-card>

    <!-- <div class="desc">
      <div class="desc-title">
        使用说明:
      </div>
      <div class="desc-content">
        <p>
          1. 请填写真实的个人信息，手机和邮箱至少填写一个，以便我们发送会议地址。
        </p>
        <p>
          2. 灰色不可选择的时间段表示该时段会议室已约满，敬请谅解。
        </p>
      </div>
    </div> -->
  </div>
</template>

<script>
import { queryMeetRoom, saveMeetOrder } from "@/service";

export default {
  name: "MeetOrder",

  data() {
    return {
      orderInfo: {
        name: "",
        company: "",
        mobile: "",
        email: "",
        meet: null
      },
      rules: {
        meet: [{ required: true, message: "请选择会议时间", trigger: "change" }]
      },
      meetingOpt: []
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.initData();
    });
  },

  methods: {
    async initData() {
      try {
        const res = await queryMeetRoom();
        this.meetingOpt = res;
      } catch (err) {
        this.$message.error("获取会议室时间段失败，请重试！");
      }
    },

    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          if (!this.orderInfo.mobile.trim() && !this.orderInfo.email.trim()) {
            this.$message.error(
              "为确保我们能够给您发送会议地址，请至少填写手机号码或者邮箱地址其中一项。"
            );
          } else {
            try {
              await saveMeetOrder(this.orderInfo);
              this.$message.success("预约成功，稍后会有工作人员联系您！");
              this.$refs.form.resetFields();
              this.orderInfo = {
                name: "",
                company: "",
                mobile: "",
                email: "",
                meet: null
              };
            } catch (err) {
              this.$message.error("预约失败，请重试！");
            }
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.order-wrapper {
  .title {
    display: flex;
    justify-content: center;

    h1 {
      font-size: 20px;
      font-weight: 700;
    }
  }

  .form-wrapper {
    display: flex;
    justify-content: center;
  }

  .btn {
    padding: 10px 0;
    text-align: center;
  }

  .desc {
    padding: 20px 0;
    color: rgba(0, 0, 0, 0.6);

    .desc-title {
      font-size: 16px;
    }

    .desc-content {
      padding-top: 15px;
      font-size: 14px;
      line-height: 24px;
    }
  }
}
</style>
