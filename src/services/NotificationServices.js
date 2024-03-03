import { http } from "../../http-common";

class NotificationServices {
  GetCurrentUserAllNotifications(pageNumber, pageSize) {
    return http.get(
      `/UserNotification/GetCurrentUserAllNotifications?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  UserReadNotification(notificationId) {
    return http.get(
      `/UserNotification/UserReadNotification?notificationId=${notificationId}`
    );
  }
}
export default new NotificationServices();
