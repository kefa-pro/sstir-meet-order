<template>
	<div class="order-wrapper">
		<el-tabs v-model="activeName">
			<el-tab-pane label="会议预约" name="order">
				<el-card class="box-card">
					<div slot="header" class="title">
						<h1>科云会议预约信息登记</h1>
					</div>
					<div class="form-wrapper">
						<el-form :model="orderInfo" :rules="rules" ref="form" label-width="120px">
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
							<el-form-item label="会议开始时间:" prop="meetTime">
								<el-date-picker
									v-model="orderInfo.meetTime"
									type="datetime"
									placeholder="选择会议时间"
									value-format="yyyy-MM-dd HH:mm:ss"
									style="width: 400px;"
								/>
							</el-form-item>
							<el-form-item label="会议时长:" prop="duration">
								<el-input-number
									v-model="orderInfo.duration"
									controls-position="right"
									:min="1"
									:max="480"
									style="width: 200px;"
								></el-input-number
								>&nbsp;(分钟)
							</el-form-item>
							<el-form-item label="参会方数:" prop="memberCnt">
								<el-select v-model="orderInfo.memberCnt" placeholder="请选择" style="width: 200px;">
									<el-option
										v-for="item in cntOpt"
										:key="item.value"
										:label="item.label"
										:value="item.value"
									>
									</el-option>
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
					<el-table-column prop="confId" label="会议编号" width="200" header-align="center" align="center" />
					<el-table-column label="会议时间" headerAlign="center" align="center" prop="startTime" />
					<el-table-column label="会议时长" headerAlign="center" align="center" prop="duration" />
					<el-table-column prop="url" label="会议地址" width="200" header-align="center" align="center">
						<template slot-scope="scope">
							<a target="_blank" :href="scope.row.confUrl">会议地址</a>
						</template>
					</el-table-column>
					<el-table-column label="预约日期" header-align="center" align="center">
						<template slot-scope="scope">
							{{ getTime(scope.row.createDate) }}
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>

		<el-dialog title="您的预约信息如下，请确认：" :visible.sync="showConfirm" width="800px">
			<div class="confirm-wrapper">
				<el-form label-width="120px">
					<el-form-item label="姓名:">
						<span>{{ orderInfo.name }}</span>
					</el-form-item>
					<el-form-item label="单位:">
						<span>{{ orderInfo.company }}</span>
					</el-form-item>
					<el-form-item label="手机:">
						<span>{{ orderInfo.mobile }}</span>
					</el-form-item>
					<el-form-item label="邮箱:">
						<span>{{ orderInfo.email }}</span>
					</el-form-item>
					<el-form-item label="会议开始时间:" prop="meetTime">
						<span>{{ orderInfo.meetTime }}</span>
					</el-form-item>
					<el-form-item label="会议时长:" prop="duration">
						<span>{{ orderInfo.duration }} (分钟)</span>
					</el-form-item>
					<el-form-item label="参会方数:" prop="memberCnt">
						<span>{{ orderInfo.memberCnt }}方</span>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showConfirm = false">取 消</el-button>
				<el-button type="primary" @click="onConfirmSave">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { saveMeetRoom, checkLogin, queryMyOrderList } from '@/service';
import appConfig from '@/config';

export default {
	name: 'MeetOrder',

	data() {
		return {
			activeName: 'order',
			loginName: '',
			orderInfo: {
				name: '',
				company: '',
				mobile: '',
				email: '',
				meetTime: null,
				duration: 30,
				memberCnt: null
			},
			rules: {
				meetTime: [{ required: true, message: '请选择会议时间', trigger: 'change' }],
				duration: [{ required: true, message: '请输入会议时长', trigger: 'blur' }],
				memberCnt: [{ required: true, message: '请选择参会方数', trigger: 'change' }]
			},
			orderList: [],
			cntOpt: [
				{
					labe: '2位',
					value: 2
				},
				{
					labe: '3位',
					value: 3
				},
				{
					labe: '4位',
					value: 4
				},
				{
					labe: '5位',
					value: 5
				}
			],
			showConfirm: false
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
				const userInfo = await checkLogin();
				if (userInfo) {
					const { trueName, mobile, company, eMail } = userInfo;
					this.orderInfo.name = trueName;
					this.orderInfo.company = company;
					this.orderInfo.mobile = mobile;
					this.orderInfo.email = eMail;

					this.queryMyOrder();
				} else {
					this.$message.error('请先登录SSTIR官网!');
					setTimeout(() => {
						window.location.href = appConfig.homepageUrl;
					}, 1000);
				}
			} catch (err) {
				this.$message.error(err.toString());
				setTimeout(() => {
						window.location.href = appConfig.homepageUrl;
					}, 1000);
			}
		},

		async queryMyOrder() {
			const res = await queryMyOrderList();
			this.orderList = res;
		},

		onSubmit() {
			this.$refs.form.validate(valid => {
				if (valid) {
					if (!this.orderInfo.mobile.trim() && !this.orderInfo.email.trim()) {
						this.$message.error('为确保我们能够给您发送会议地址，请至少填写手机号码或者邮箱地址其中一项。');
					} else {
						this.showConfirm = true;
					}
				}
			});
		},

		async handleSubmit() {
			try {
				const postData = {
					startTime: this.orderInfo.meetTime,
					maxMember: this.orderInfo.memberCnt,
					duration: this.orderInfo.duration,
					pUserName: this.orderInfo.name,
					company: this.orderInfo.company,
					mobile: this.orderInfo.mobile,
					email: this.orderInfo.email
				};
				await saveMeetRoom(postData);
				this.$message.success('预约成功!');
				await this.queryMyOrder();
				this.$refs.form.resetFields();
				this.orderInfo.meetTime = null;
				this.orderInfo.duration = null;
				this.orderInfo.memberCnt = null;
				this.activeName = 'my';
			} catch (err) {
				this.$message.error(err || '创建失败，请重试!');
			}
		},

		handleConfirmClose() {},

		onConfirmSave() {
			this.handleSubmit()
		},

		getTime(val) {
			const time = new Date(val);
			return `${time.getFullYear()}-${(time.getMonth() + 1 + '').padStart(2, '0')}-${(
				time.getDate() + ''
			).padStart(2, '0')}`;
		}
	}
};
</script>

<style lang="less" scoped>
.order-wrapper {
	/deep/.el-card__body {
		padding: 10px !important;
	}
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

	.confirm-wrapper {
		/deep/ .el-form-item {
			margin-bottom: 0 !important;
		}
	}
}
</style>
