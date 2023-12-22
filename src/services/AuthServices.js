import { http, httpFile } from "../../http-common";

class AuthServices {
  login(data) {
    return http.post("/Account/Login", data);
  }
  createAccount(data) {
    return httpFile.post("/Account/Register", data);
  }
  getUserInfo() {
    return http.get("/Account/GetUserInfo");
  }
}
export default new AuthServices();
