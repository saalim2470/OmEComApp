import { http } from "../../http-common";

class NotificationServices {
  GetCurrentUserAllNotifications(pageNumber, pageSize) {
    return http.get(
      `/UserNotification/GetCurrentUserAllNotifications?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
}
export default new NotificationServices();
