import { AppGet, AppPost } from "@/utils/request";

export function queryMeetRoom() {
  return AppGet("/meet/queryroom");
}

export function saveMeetOrder(data) {
  return AppPost("/meet/saveorder", data);
}

export function queryOrderList() {
  return AppGet('/meet/queryorderlist')
}

export function agreeMeetOrder(data) {
  return AppPost('/meet/agree', data)
}