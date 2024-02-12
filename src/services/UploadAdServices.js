import { http, httpFile } from "../../http-common";

class UploadAdServices {
  postBannerOrSliderAd(data) {
    return httpFile.post(
      `/HomePagePromotedContent/PostBannerOrSliderImage`,
      data
    );
  }
  getPromotedContent(pageNumber, pageSize) {
    return http.get(
      `/HomePagePromotedContent?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
}
export default new UploadAdServices();
