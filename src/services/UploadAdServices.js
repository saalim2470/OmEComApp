import { http, httpFile } from "../../http-common";

class UploadAdServices {
  postBannerOrSliderAd(subscriptionID, data) {
    console.log("-=-banner data=-=-", subscriptionID, data);
    return httpFile.post(
      `/UserSubscription/GetSubscriptionPaymentLinkForBanner?subscriptionID=${subscriptionID}`,
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
