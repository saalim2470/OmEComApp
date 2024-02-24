import { http, httpFile } from "../../http-common";

class SubscriptionServices {
  getSubscriptionPlanDetail(pageNumber, pageSize) {
    return http.get(
      `/Subscription?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  getSubscriptionPlan(subscriptionID, data,subscriptionType) {
    console.log(subscriptionID, data,subscriptionType);
    return httpFile.post(
      `/UserSubscription/GetSubscriptionPaymentLink?subscriptionID=${subscriptionID}&subscriptionType=${subscriptionType}`,
      data
    );
  }
}
export default new SubscriptionServices();
