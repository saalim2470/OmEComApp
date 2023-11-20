import { http } from "../../http-common";

class AdContentServices {
  getContentByCategory(categoryId) {
    return http.get(
      `/AdContent/GetAdContentsByCategory?categtoryId=${categoryId}`
    );
  }
  addContentLike(data) {
    return http.post("/UserLikeContent");
  }
}

export default new AdContentServices();
