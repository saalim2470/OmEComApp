import { http } from "../../http-common";

class LegalDataServices {
  getLegalData() {
    return http.get("/LegalData");
  }
}

export default new LegalDataServices();
