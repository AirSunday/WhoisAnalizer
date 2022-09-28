import http from "../http-common";

class WhoisDataService {
  FindSession(){
    return http.get('users');
  }
  FindByEmail(data) {
    return http.post(`/users/findout`, data);
  }
  FindById(data) {
    return http.post(`/users/findbyid`, data);
  }
  create(data) {
    return http.post("/users/create", data);
  }
  update(data) {
    return http.post(`/users/update`, data);
  }
  signIn(data) {
    return http.post(`/sign-in`, data);
  }
  signOut(data) {
    return http.post(`/sign-out`, data);
  }
  delete(email) {
    return http.delete(`/users`, { email : email });
  }
  getWhoisInfo(data) {
    return http.post(`/get/getdomain`, data)
  }
  get10(id){
    return http.get(`/get/get10/${id}`);
  }
  GetNsServers(id){
    return http.get(`/get/nsservers/${id}`);
  }
  GetRegistrant(){
    return http.get(`/get/registrant`);
  }
  GetCountDomain(table){
    return http.get(`/get/GetCountDomain/${table}`);
  }
  AddDomain(data){
    return http.post(`/users/Domain`, data);
  }
  DeleteDomain(data){
    return http.put(`/users/Domain`, data);
  }
  GetDomain(data){
    return http.post(`/users/AllDomains`, data);
  }
}
export default new WhoisDataService();