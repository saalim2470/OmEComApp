import { http, httpFile } from "../../http-common";

class AdContentServices {
  getContentByCategory(categoryId, pageNumber, pageSize) {
    return http.get(
      `/AdContent/GetAdContentsByCategory?categtoryId=${categoryId}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  addContentLike(data) {
    return http.post("/UserLikeContent", data);
  }
  addContentSave(data) {
    return http.post("/UserSavedAdContent", data);
  }
  addAdContent(data) {
    return httpFile.post("/AdContent/PostWithFiles", data);
  }
}

export default new AdContentServices();
