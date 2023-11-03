import { http } from "../../http-common";

class AdContentServices {
  getContentByCategory(categoryId) {
    return http.get(
      `/AdContent/GetAdContentsByCategory?categtoryId=${categoryId}`
    );
  }
}

export default new AdContentServices();
