import { http, httpFile } from "../../http-common";

class UploadAdServices {
  postBannerOrSliderAd(subscriptionID,data) {
    return httpFile.post(
      `/api/UserSubscription/GetSubscriptionPaymentLinkForBanner?subscriptionID=${subscriptionID}`,
      data
    );
  }
  //   return httpFile.post(
  //     `/HomePagePromotedContent/PostBannerOrSliderImage`,
  //     data
  //   );
  // }
  getPromotedContent(pageNumber, pageSize) {
    return http.get(
      `/HomePagePromotedContent?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
}
export default new UploadAdServices();
