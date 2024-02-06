import { http } from "../../http-common";

class ProfileServices {
  getUserAdContent(pageNumber, pageSize) {
    return http.get(
      `/AdContent/GetUserAdContents?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  getOtherUserInfo(userId) {
    console.log("--=-get user info call-=-=", userId);
    return http.get(`/Account/GetUserInfoByUserId?userId=${userId}`);
  }
  followUser(data) {
    return http.post("/Follower", data);
  }
}
export default new ProfileServices();
