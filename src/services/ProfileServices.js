import { http } from "../../http-common";

class ProfileServices {
  getUserAdContent(pageNumber, pageSize) {
    return http.get(
      `/AdContent/GetUserAdContents?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  getOtherUserInfo(userId) {
    return http.get(`/Account/GetUserInfoByUserId?userId=${userId}`);
  }
}
export default new ProfileServices();
