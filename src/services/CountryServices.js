import { http } from "../../http-common";

class CountryServices {
  getCountry(pageNumber, pageSize) {
    return http.get(`/Country?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
  getStateByCountryId(countryId, pageNumber, pageSize) {
    return http.get(
      `/State/GetStateByCountry?CountryId=${countryId}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  getCityByStateId(stateId, pageNumber, pageSize) {
    return http.get(
      `/City/GetCityByState?StateId=${stateId}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
}

export default new CountryServices();
