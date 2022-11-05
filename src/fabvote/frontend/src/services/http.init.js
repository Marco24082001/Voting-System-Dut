import axios from "axios";
import env from "../../env";
// import { refreshToken } from "@/helper/refreshToken";
// import { getConfigApp } from "@/helper/getConfigApp";
// import { accessToken } from "@/helper/accessToken";
// import { storeTokenToVuex } from "@/helper/storeTokenToVuex";

// const Cookie = require("js-cookie");
export default class Http {
  constructor(status) {
    this.handlerEnabled =
      status && status.handlerEnabled ? status.handlerEnabled : false;
    this.instance = axios.create({
      baseURL: env.API_URL,
    });
    return this.init();
  }

  requestHandler(request) {
    const store = require("@/store");
    const access_token = store.default.getters['authentication/getAccessToken']
    if (access_token) {
      request.headers["accessToken"] = access_token;
    }
    return request;
  }

//   errorHandler(error) {
//     if (error?.response?.status === 401) {
//       this.renewToken();
//     }
//     return Promise.reject(error);
//   }

//   successHandler(response) {
//     if (this.handlerEnabled) {
//       return response; // TODO: Handle Success Response if need
//     }
//     return response;
//   }

  init() {
    this.instance.interceptors.request.use((request) =>
      this.requestHandler(request)
    );
    // this.instance.interceptors.response.use(
    //   (response) => this.successHandler(response),
    //   (error) => this.errorHandler(error)
    // );
    return this.instance;
  }

//   async renewToken() {
//     const token = refreshToken();
//     if (token) {
//       const data = getConfigApp();
//       data.append("refresh_token", token);
//       try {
//         await this.instance
//           .post(`oauth2/refresh_token`, data)
//           .then((response) => {
//             if (response?.status === 200) {
//               storeTokenToVuex(
//                 response.data.access_token,
//                 response.data.refresh_token
//               );
//             } else {
//               localStorage.removeItem("vuex");
//               localStorage.clear();
//             }
//           });
//       } catch (error) {
//         return false;
//       }
//     }
//     return false;
//   }
}
