import { http } from "../../http-common";

class SearchServices {
  getSearchData(keyword, pageNumber, pageSize) {
    return http.get(
      `/AdContent/SearchAdContent?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
}
export default new SearchServices();
