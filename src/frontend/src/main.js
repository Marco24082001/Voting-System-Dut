// import { createApp } from 'vue'
// import App from './App.vue'
// import router from '@/router'
// import ElementPlus from 'element-plus'
// import { library } from "@fortawesome/fontawesome-svg-core"
// import { faPhone, fas } from "@fortawesome/free-solid-svg-icons";
// import '@fortawesome/fontawesome-free/css/all.css'
// import '@fortawesome/fontawesome-free/js/all.js'
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// // if you're using CDN, please remove this line.
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// import 'element-plus/dist/index.css'
// library.add(faPhone, fas);

// const app = createApp(App)
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(key, component)
//   }
// app.use(ElementPlus)
// app.use(router)
// app.component("font-awesome-icon", FontAwesomeIcon)
// app.mount('#app')


// import Vue from "vue";
import App from "./App.vue";
import { createApp } from 'vue';
import ElementPlus from 'element-plus'
import router from "./router/index";
import 'element-plus/dist/index.css'

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";
const app = createApp(App)
// import "bootstrap/dist/css/bootstrap.css";
// import "@/assets/sass/paper-dashboard.scss";
// import "@/assets/css/themify-icons.css";
app.use(ElementPlus)
app.use(router);
app.use(PaperDashboard);

app.mount('#app')
/* eslint-disable no-new */
// new Vue({
//   router,
//   render: h => h(App)
// }).$mount("#app");
