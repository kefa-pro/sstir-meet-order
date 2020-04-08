import { AppPost } from "@/utils/request";

// 判断登录
export function checkLogin() {
  return AppPost('/judgeAndGetUserInfo')
}

// // 获取剩余方数
// export function getResidueSquare() {
//   return AppGet('/residueSquares')
// }

// 创建会议
export function saveMeetRoom(data) {
  return AppPost('/createMeeting', data)
}

// 查询我的预约
export function queryMyOrderList() {
  return AppPost('/privateAppointMeetings')
}

// 查询所有预约
export function queryOrderList() {
  return AppPost('/appointMeetings')
}