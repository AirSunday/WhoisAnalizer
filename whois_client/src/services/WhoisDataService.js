// import http from "../http-common";

class WhoisDataService {
  FindSession() {
    // return http.get('users');
    return fetch("https://188.68.222.76:8080/api/users");
  }
  FindByEmail(data) {
    // return http.post(`/users/findout`, data);
    return fetch("https://188.68.222.76:8080/api/users/findout", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  FindById(data) {
    // return http.post(`/users/findbyid`, data);
    return fetch("https://188.68.222.76:8080/api/users/findbyid", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  create(data) {
    // return http.post("/users/create", data);
    return fetch("https://188.68.222.76:8080/api/users/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  update(data) {
    // return http.post(`/users/update`, data);
    return fetch("https://188.68.222.76:8080/api/users/update", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  signIn(data) {
    // return http.post(`/sign-in`, data);
    return fetch("https://188.68.222.76:8080/api/sign-in", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  signOut(data) {
    // return http.post(`/sign-out`, data);
    return fetch("https://188.68.222.76:8080/api/sign-out", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  delete(email) {
    // return http.delete(`/users`, { email : email });
    return fetch("https://188.68.222.76:8080/api/users", {
      method: "DELETE",
      body: JSON.stringify({ email: email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  getWhoisInfo(data) {
    // return http.post(`/get/getdomain`, data)
    return fetch("https://188.68.222.76:8080/api/get/getdomain", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  get10(id) {
    // return http.get(`/get/get10/${id}`);
    return fetch(`https://188.68.222.76:8080/api/get/get10/${id}`);
  }
  GetNsServers(id) {
    // return http.get(`/get/nsservers/${id}`);
    return fetch(`https://188.68.222.76:8080/api/get/nsservers/${id}`);
  }
  GetRegistrant() {
    // return http.get(`/get/registrant`);
    return fetch("https://188.68.222.76:8080/api/get/registrant");
  }
  GetCountDomain(table) {
    // return http.get(`/get/GetCountDomain/${table}`);
    return fetch(`https://188.68.222.76:8080/api/get/GetCountDomain/${table}`);
  }
  AddDomain(data) {
    // return http.post(`/users/Domain`, data);
    return fetch("https://188.68.222.76:8080/api/users/Domain", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  DeleteDomain(data) {
    // return http.put(`/users/Domain`, data);
    return fetch("https://188.68.222.76:8080/api/users/Domain", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  GetDomain(data) {
    // return http.post(`/users/AllDomains`, data);
    return fetch("https://188.68.222.76:8080/api/users/AllDomains", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  GetNews(data) {
    // return http.post(`/news`, data);
    return fetch("https://188.68.222.76:8080/api/news", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  GetNewsTitle(data) {
    // return http.post(`/news/title`, data);
    return fetch("https://188.68.222.76:8080/api/news/title", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  GetCountNews() {
    // return http.get(`/news/count`);
    return fetch("https://188.68.222.76:8080/api/news/count");
  }
  GetRole(data) {
    // return http.post(`/users/getrole`, data);
    return fetch("https://188.68.222.76:8080/api/users/getrole", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  /////////////////////////////////
  GetAllUsers(id) {
    // return http.get(`/admin/user/${id}`);
    return fetch(`https://188.68.222.76:8080/api/get/admin/user/${id}`);
  }
  GetCountUsers() {
    // return http.get(`/admin/countusers`);
    return fetch("https://188.68.222.76:8080/api/admin/countusers");
  }
  DeleteUser(data) {
    // return http.post(`/admin/userdelete`, data);
    return fetch("https://188.68.222.76:8080/api/admin/userdelete", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  ChangeRole(data) {
    // return http.post(`/admin/changerole`, data);
    return fetch("https://188.68.222.76:8080/api/admin/changerole", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  CreateNews(data) {
    // return http.post(`/admin/news`, data);
    return fetch("https://188.68.222.76:8080/api/admin/news", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  GetAllNews(id) {
    // return http.post(`/admin/getallnews/${id}`);
    return fetch(`https://188.68.222.76:8080/api/admin/getallnews/${id}`);
  }
  ChangeNews(data) {
    // return http.put(`/admin/news`, data);
    return fetch("https://188.68.222.76:8080/api/admin/news", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  DeleteNews(data) {
    // return http.post(`/admin/newsdelete`, data);
    return fetch("https://188.68.222.76:8080/api/admin/newsdelete", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  GetUrlDomain() {
    // return http.post(`/admin/url/get`);
    return fetch("https://188.68.222.76:8080/api/admin/url/get");
  }
  ChangeUrlDomain(data) {
    // return http.post(`admin/url/change`, data);
    return fetch("https://188.68.222.76:8080/api/admin/url/change", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
export default new WhoisDataService();
