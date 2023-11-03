import { http } from "../../http-common";

class AuthServices {
  login(data) {
    return http.post("/Account/Login", data);
  }
}
export default new AuthServices();
