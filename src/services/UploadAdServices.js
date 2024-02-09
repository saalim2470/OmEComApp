import { http, httpFile } from "../../http-common";

class UploadAdServices {
  postBannerOrSliderAd(data) {
    return httpFile.get(
      `/HomePagePromotedContent/PostBannerOrSliderImage`,
      data
    );
  }
}
export default new UploadAdServices();
