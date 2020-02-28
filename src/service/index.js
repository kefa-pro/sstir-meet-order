import { AppPost, AppFetchJsonp } from "@/utils/request";

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

export function checkLogin() {
  return AppFetchJsonp('http://www.sstir.cn/logCheck_sgst.jsp')
}

export function getUserInfoByLogName(name) {
  return AppFetchJsonp(`/meet!getUserInfo.do?logName=${name}`)
}

export function saveMeetRoom(data) {
  const { meetCode, startTime, endTime, id} = data
  const url = `/meet!updateOrCreateMeetRoom.do?meetCode=${meetCode}&startTime=${startTime}&endTime=${endTime}&id=${id}`
  return AppFetchJsonp(url)
}

export function delMeetRoom(id) {
  return AppFetchJsonp(`/meet!deleteMeetRoom.do?id=${id}`)
}