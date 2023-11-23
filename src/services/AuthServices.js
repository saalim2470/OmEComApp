import { http } from "../../http-common";

class AuthServices {
  login(data) {
    return http.post("/Account/Login", data);
  }
  createAccount(data) {
    return http.post("/Account/Register", data);
  }
}
export default new AuthServices();
