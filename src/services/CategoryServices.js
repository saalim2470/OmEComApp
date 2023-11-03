import { http } from "../../http-common";

class CategoryServices {
  getCategory(pageNumber, pageSize) {
    return http.get(
      `/AdContentCategory?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
}

export default new CategoryServices();
