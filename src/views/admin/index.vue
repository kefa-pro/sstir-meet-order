<template>
	<div class="admin-wrapper">
		<el-tabs v-model="activeName">
			<el-tab-pane label="预约管理" name="order">
				<el-table :data="tblOrderData">
					<el-table-column prop="mame" label="姓名" fixed />
					<el-table-column prop="company" label="单位" width="180" />
					<el-table-column prop="mobile" label="电话" width="120" />
					<el-table-column prop="email" label="邮箱" width="180" />
					<el-table-column prop="meetCode" label="会议编号" />
					<el-table-column label="会议时间" width="300" headerAlign="center">
						<template slot-scope="scope"> {{ scope.row.start_time }} ~ {{ scope.row.end_time }} </template>
					</el-table-column>
					<el-table-column label="预约状态">
						<template slot-scope="scope">
							{{ scope.row.orderStatus ? '预约成功' : '预约中' }}
						</template>
					</el-table-column>
					<el-table-column prop="url" label="Url" width="500" />
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="会议室管理" name="room">
				<div class="btn-wrapper">
					<el-button type="primary" @click="onRoomAddClick">新增</el-button>
				</div>
				<el-table :data="tblRoomData">
					<el-table-column prop="meetCode" label="编号" />
					<el-table-column prop="startTime" label="开始时间" />
					<el-table-column prop="endTime" label="结束时间" />
					<el-table-column label="状态">
						<template slot-scope="scope">
							{{ scope.row.isOrder ? '已预约' : '空闲' }}
						</template>
					</el-table-column>
					<el-table-column>
						<template slot-scope="scope">
							<el-button
								v-if="!scope.row.isOrder"
								type="danger"
								icon="el-icon-delete"
								@click="onDelClick(scope.row.id)"
							/>
							<el-button
								v-if="!scope.row.isOrder"
								type="primary"
								icon="el-icon-edit"
								@click="onEditClick(scope.row)"
							/>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>

		<el-dialog title="会议室编辑" :visible.sync="showRoomEdit" width="800px">
			<el-form :model="currentRoomInfo" :rules="rules" ref="refForm">
				<el-form-item label="编号:" prop="meetCode">
					<el-input v-model="currentRoomInfo.meetCode" style="width: 400px;" />
				</el-form-item>
				<el-form-item label="时间:" prop="meetTime">
					<el-date-picker
						v-model="currentRoomInfo.meetTime"
						type="datetimerange"
						range-separator="至"
						start-placeholder="开始时间"
						end-placeholder="结束时间"
						style="width: 400px;"
						value-format="timestamp"
					>
					</el-date-picker>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="onRoomCancelClick">取 消</el-button>
				<el-button type="primary" @click="onRoomSaveClick">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { queryOrderList, agreeMeetOrder, queryMeetRoom, saveMeetRoom, delMeetRoom } from '@/service';
export default {
	name: 'AdminPage',

	data() {
		return {
			activeName: 'order',
			tblOrderData: [],
			tblRoomData: [],
			showRoomEdit: false,
			currentRoomInfo: {
				id: '',
				meetCode: '',
				meetTime: [],
			},
			rules: {
				meetCode: [{ required: true, message: '请输入会议编号', trigger: 'blur' }],
				meetTime: [{ required: true, message: '请选择会议时间', trigger: 'change' }],
			},
		};
	},

	mounted() {
		this.initData();
	},

	methods: {
		async initData() {
			const res = await queryOrderList();
			this.tblOrderData = res;
			console.log(this.tblOrderData)

			const resRoom = await queryMeetRoom();
			this.tblRoomData = resRoom;
		},

		onAgreeClick(id, meet) {
			this.$confirm('是否确认批准该用户的预约？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				try {
					await agreeMeetOrder({
						id,
						meet,
					});
					this.$message.success('审批通过');
					this.initData();
				} catch (err) {
					this.$message.error('审批失败，请重试');
				}
			});
		},

		onRoomAddClick() {
      this.currentRoomInfo = {
				id: '',
				meetCode: '',
				meetTime: [],
			}
			this.showRoomEdit = true;
		},

		onRoomCancelClick() {
			this.showRoomEdit = false;
			this.$refs.refForm.resetFields();
		},

		onRoomSaveClick() {
			this.$refs.refForm.validate(async valid => {
				if (valid) {
					const { id, meetCode, meetTime } = this.currentRoomInfo;
					const postData = {
						id: id,
						meetCode,
						startTime: meetTime[0],
						endTime: meetTime[1],
					};
					try {
						await saveMeetRoom(postData);
						this.$message.success('保存成功！');
						this.showRoomEdit = false;
						this.initData();
					} catch (err) {
						this.$message.error(err);
					}
				}
			});
		},

		onDelClick(id) {
			this.$confirm('是否确认删除?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(async () => {
          try {
            await delMeetRoom(id)
            this.$message.success('删除成功')
            this.initData()
          } catch (err) {
            this.$message.error(err)
          }
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					});
				});
		},

		onEditClick(row) {
      this.currentRoomInfo = {
				id: row.id,
				meetCode: row.meetCode,
				meetTime: [new Date(row.startTime) - 0, new Date(row.endTime) - 0],
			}
			this.showRoomEdit = true;
		},
	},
};
</script>

<style lang="less" scoped>
.admin-wrapper {
	.btn-wrapper {
		display: flex;
		justify-content: flex-end;
	}
}
</style>
