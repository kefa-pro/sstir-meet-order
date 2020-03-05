<template>
	<div class="order-wrapper">
		<el-tabs v-model="activeName">
			<el-tab-pane label="会议预约" name="order">
				<el-card class="box-card">
					<div slot="header" class="title">
						<h1>科云会议预约信息登记</h1>
					</div>
					<div class="form-wrapper">
						<el-form :model="orderInfo" :rules="rules" ref="form" label-width="100px">
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
									disabled
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
								<el-select v-model="orderInfo.meet" placeholder="请选择会议时间" style="width: 400px;">
									<el-option
										v-for="item in meetingOpt"
										:key="item.id"
										:label="`${item.startTime} ~ ${item.endTime}`"
										:value="item.id"
										:disabled="!!item.isOrder"
									/>
								</el-select>
							</el-form-item>
						</el-form>
					</div>
					<div class="btn">
						<el-button type="primary" @click="onSubmit">提交</el-button>
					</div>
				</el-card>
			</el-tab-pane>
			<el-tab-pane label="我的预约" name="my">
				<el-table :data="orderList">
					<el-table-column prop="meetCode" label="会议编号" width="200" header-align="center" align="center" />
					<el-table-column label="会议时间" headerAlign="center" align="center">
						<template slot-scope="scope"> {{ scope.row.start_time }} ~ {{ scope.row.end_time }} </template>
					</el-table-column>
					<el-table-column prop="url" label="会议地址" width="200" header-align="center" align="center">
						<template slot-scope="scope">
							<a target="_blank" :href="scope.row.url">会议地址</a>
						</template>
					</el-table-column>
					<el-table-column label="预约日期" header-align="center" align="center">
						<template slot-scope="scope">
							{{getTime(scope.row.createTime)}}
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import { queryMeetRoom, saveMeetOrder, checkLogin, getUserInfoByLogName, getMyOrder } from '@/service';

export default {
	name: 'MeetOrder',

	data() {
		return {
			activeName: 'order',
			loginName: '',
			orderInfo: {
				userId: '',
				name: '',
				company: '',
				mobile: '',
				email: '',
				meet: null,
			},
			rules: {
				meet: [{ required: true, message: '请选择会议时间', trigger: 'change' }],
			},
			meetingOpt: [],
			orderList: [],
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
				const { logFlag, logName } = await checkLogin();
				if (logFlag) {
					this.loginName = logName;

					const { userId, name, company, mobile, email } = await getUserInfoByLogName(logName);
					this.orderInfo = {
						userId,
						name,
						company,
						mobile,
						email,
						meet: this.orderInfo.meet,
					};

					this.meetingOpt = await queryMeetRoom();

					const myOrder = await getMyOrder(userId);
					console.log(myOrder);
					if (myOrder) {
						this.orderList = myOrder;
					}
				} else {
					this.$message.error('请先登录SSTIR官网!');
					setTimeout(() => {
						window.location.href = 'http://www.sstir.cn';
					}, 1000);
				}
			} catch (err) {
				this.$message.error('获取会议室时间段失败，请重试！');
			}
		},

		onSubmit() {
			this.$refs.form.validate(async valid => {
				if (valid) {
					if (!this.orderInfo.mobile.trim() && !this.orderInfo.email.trim()) {
						this.$message.error('为确保我们能够给您发送会议地址，请至少填写手机号码或者邮箱地址其中一项。');
					} else {
						try {
							await saveMeetOrder(this.orderInfo);
							this.$message.success('预约成功!');
							this.$refs.form.resetFields();
							this.orderInfo.meet = null;
							await this.initData()
							this.activeName = 'my'
						} catch (err) {
							this.$message.error(err);
						}
					}
				}
			});
		},

		getTime(val) {
			const time = new Date(val)
			return `${time.getFullYear()}-${(time.getMonth() + 1 + '').padStart(2, '0')}-${(time.getDate() + '').padStart(2, '0')}`
		}
	},
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
