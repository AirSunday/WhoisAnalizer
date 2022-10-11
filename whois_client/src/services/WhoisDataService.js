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
  GetNews(data){
    return http.post(`/news`, data);
  }
  GetNewsTitle(data){
    return http.post(`/news/title`, data);
  }
  GetCountNews(){
    return http.get(`/news/count`);
  }
  GetRole(data){
    return http.post(`/users/getrole`, data);
  }
  /////////////////////////////////
  GetAllUsers(id){
    return http.get(`/admin/user/${id}`);
  }
  GetCountUsers(){
    return http.get(`/admin/countusers`);
  }
  DeleteUser(data){
    return http.post(`/admin/userdelete`, data);
  }
  ChangeRole(data){
    return http.post(`/admin/changerole`, data);
  }
  CreateNews(data){
    return http.post(`/admin/news`, data);
  }
  GetAllNews(id){
    return http.post(`/admin/getallnews/${id}`);
  }
  ChangeNews(data){
    return http.put(`/admin/news`, data);
  }
  DeleteNews(data){
    return http.post(`/admin/newsdelete`, data);
  }
  GetUrlDomain(){
    return http.post(`/admin/url/get`);
  }
  ChangeUrlDomain(data){
    return http.post(`admin/url/change`, data);
  }
}
export default new WhoisDataService();