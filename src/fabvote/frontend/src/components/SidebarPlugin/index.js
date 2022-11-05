import Sidebar from "./SideBar.vue";
import SidebarLink from "./SidebarLink";
import { ref } from 'vue';
const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [],
  displaySidebar(value) {
    this.showSidebar = value;
  }
};

const SidebarPlugin = {
  install: (app) => {
    app.mixin({
      data() {
        return {
          sidebarStore : SidebarStore
        }
      }
    })
    app.config.globalProperties.$sidebar = ref(SidebarStore);
    app.component("side-bar", Sidebar);
    app.component("sidebar-link", SidebarLink);
  }
};

export default SidebarPlugin;
