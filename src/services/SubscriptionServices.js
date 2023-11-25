import { http } from "../../http-common";

class SubscriptionServices {
  getSubscriptionPlanDetail(pageNumber, pageSize) {
    return http.get(
      `/Subscription?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  getSubscriptionPlan(subscriptionID) {
    return http.post(
      `/UserSubscription/Subscribe?subscriptionID=${subscriptionID}`
    );
  }
}
export default new SubscriptionServices();
