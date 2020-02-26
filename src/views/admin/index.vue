<template>
  <div class="admin-wrapper">
    <el-tabs v-model="activeName">
      <el-tab-pane label="预约管理" name="order">
        <el-table :data="tblOrderData">
          <el-table-column label="操作" headerAlign="center" fixed>
            <template slot-scope="scope">
              <el-button
                v-if="!scope.row.orderStatus"
                type="primary"
                @click="onAgreeClick(scope.row.id, scope.row.meetCode)"
                >通过</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" fixed />
          <el-table-column prop="company" label="单位" />
          <el-table-column prop="mobile" label="电话" width="120" />
          <el-table-column prop="email" label="邮箱" width="120" />
          <el-table-column prop="meetCode" label="会议编号" />
          <el-table-column label="会议时间" width="300" headerAlign="center">
            <template slot-scope="scope">
              {{ scope.row.start }} ~ {{ scope.row.end }}
            </template>
          </el-table-column>
          <el-table-column label="预约状态">
            <template slot-scope="scope">
              {{ scope.row.orderStatus ? "预约成功" : "预约中" }}
            </template>
          </el-table-column>
          <el-table-column prop="url" label="Url" width="500" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="会议室管理" name="room">
        <el-table :data="tblRoomData">
          <el-table-column prop="id" label="编号" />
          <el-table-column prop="start" label="开始时间" />
          <el-table-column prop="end" label="结束时间" />
          <el-table-column label="状态">
            <template slot-scope="scope">
              {{scope.row.disabled ? '已预约' : '空闲'}}
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { queryOrderList, agreeMeetOrder, queryMeetRoom } from "@/service";
export default {
  name: "AdminPage",

  data() {
    return {
      activeName: "order",
      tblOrderData: [],
      tblRoomData: []
    };
  },

  mounted() {
    this.initData();
  },

  methods: {
    async initData() {
      const res = await queryOrderList();
      this.tblOrderData = res;

      const resRoom = await queryMeetRoom()
      this.tblRoomData = resRoom
    },

    onAgreeClick(id, meet) {
      this.$confirm('是否确认批准该用户的预约？', '提示', {
        confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      })
      .then(async () => {
        try {
          await agreeMeetOrder({
            id,
            meet
          })
          this.$message.success('审批通过')
          this.initData()
        } catch (err) {
          this.$message.error('审批失败，请重试')
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.admin-wrapper {
}
</style>
