import { http, httpFile } from "../../http-common";

class AdContentServices {
  getContentByCategory(categoryId, pageNumber, pageSize) {
    return http.get(
      `/AdContent/GetAdContentsByCategory?categtoryId=${categoryId}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  getAllContent(pageNumber, pageSize) {
    return http.get(
      `/AdContent/GetAllAdContents?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  addContentLike(data) {
    return http.post("/UserLikeContent", data);
  }
  addContentSave(data) {
    return http.post("/UserSavedAdContent", data);
  }
  // add update both one url
  addAdContent(data) {
    return httpFile.post("/AdContent/PostWithFiles", data);
  }
  deleteAdContent(id) {
    return http.delete(`/AdContent/${id}`);
  }
  getAdContentByUserId(userId, pageNumber, pageSize) {
    return http.get(
      `/AdContent/GetAdContentsByUserId?userId=${userId}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  getSavedContent(pageNumber, pageSize) {
    return http.get(
      `/UserSavedAdContent?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
}

export default new AdContentServices();
