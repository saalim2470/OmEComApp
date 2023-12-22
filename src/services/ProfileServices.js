import { http } from "../../http-common";

class ProfileServices {
  getUserAdContent(pageNumber, pageSize) {
    return http.get(
      `/AdContent/GetUserAdContents?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
}
export default new ProfileServices();
