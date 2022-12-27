import axios from "axios";
import env from "../../env";
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

  init() {
    this.instance.interceptors.request.use((request) =>
      this.requestHandler(request)
    );
    return this.instance;
  }
}
