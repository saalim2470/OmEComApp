import { http } from "../../http-common";

class CountryServices {
  getCountry() {
    return http.get(`/Country/GetAllCountry`);
  }
  getStateByCountryId(countryId) {
    return http.get(`/State/GetStateByCountry?CountryId=${countryId}`);
  }
  getCityByStateId(stateId) {
    return http.get(`/City/GetCityByState?stateId=${stateId}`);
  }
}

export default new CountryServices();
