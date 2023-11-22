import { http } from "../../http-common";

class AdContentServices {
  getContentByCategory(categoryId, pageNumber, pageSize) {
    return http.get(
      `/AdContent/GetAdContentsByCategory?categtoryId=${categoryId}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  addContentLike(data) {
    return http.post("/UserLikeContent", data);
  }
  addAdContent(data) {
    return http.post("/AdContent", data);
  }
}

export default new AdContentServices();
