import { AppPost, AppGet, AppFetchJsonp } from "@/utils/request";

export function queryMeetRoom() {
  return AppFetchJsonp("/meet!getMeetTime.do");
}

export function saveMeetOrder(data) {
  const { email, meet, mobile, company, userId, name} = data
  const url = `/meet!commitMeet.do?email=${email}&meet=${meet}&mobile=${mobile}&company=${company}&userId=${userId}&name=${name}`
  return AppFetchJsonp(url);
}

export function queryOrderList() {
  return AppFetchJsonp('/meet!getAdminOrder.do')
}

export function agreeMeetOrder(data) {
  return AppPost('/meet/agree', data)
}

export function getUserInfoByLogName(name) {
  return AppFetchJsonp(`/meet!getUserInfo.do?logName=${name}`)
}

export function delMeetRoom(id) {
  return AppFetchJsonp(`/meet!deleteMeetRoom.do?id=${id}`)
}

export function getMyOrder(id) {
  return AppFetchJsonp(`/meet!getOrderInfoByUserId.do?userId=${id}`)
}

// 判断登录
export function checkLogin() {
  return AppPost('/judgeAndGetUserInfo')
}

// 获取剩余方数
export function getResidueSquare() {
  return AppGet('/residueSquares')
}

// 创建会议
export function saveMeetRoom(data) {
  AppPost('/createMeeting', data)
}