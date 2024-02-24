import { http, httpFile } from "../../http-common";

class SubscriptionServices {
  getSubscriptionPlanDetail(pageNumber, pageSize) {
    return http.get(
      `/Subscription?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  getSubscriptionPlan(subscriptionID, data) {
    console.log(subscriptionID, data);
    return httpFile.post(
      `/UserSubscription/GetSubscriptionPaymentLinkForAdContent?subscriptionID=${subscriptionID}`,
      data
    );
  }
}
export default new SubscriptionServices();
