import { http } from "../../http-common";

class SearchServices {
  getSearchData(keyword, pageNumber, pageSize, filterType) {
    return http.get(
      `/AdContent/SearchAdContent?keyword=${keyword}&type=${filterType}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
}
export default new SearchServices();
