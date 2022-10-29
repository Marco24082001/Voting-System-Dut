import Sidebar from "./SideBar.vue";
import SidebarLink from "./SidebarLink";

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
    // app.provide('$sidebar', SidebarStore);
    // app.prototype.$sidebar = SidebarStore;
    app.config.globalProperties.$sidebar = SidebarStore;
    app.component("side-bar", Sidebar);
    app.component("sidebar-link", SidebarLink);
  }
};

export default SidebarPlugin;
