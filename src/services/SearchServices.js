import { http } from "../../http-common";

class SearchServices {
  getSearchData(keyword) {
    return http.get(`/AdContent/SearchAdContent?keyword=${keyword}`);
  }
}
export default new SearchServices();
