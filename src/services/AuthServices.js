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
  editProfile(data) {
    return httpFile.post("/Account/Updateuser", data);
  }
  forgotPassword(data) {
    return http.post(`/Account/ForgotPassword?email=${data}`);
  }
  resetPassword(data) {
    return http.post(`/Account/ResetPassword`, data);
  }
}
export default new AuthServices();
