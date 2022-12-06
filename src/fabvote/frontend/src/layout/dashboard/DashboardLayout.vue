<template>
  <div class="wrapper">
    <side-bar v-if="role === 'admin'" :sidebarLinks="sidebarLinks">
      <template v-slot:links>
      </template>
      <mobile-menu>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-panel"></i>
            <p>Stats</p>
          </a>
        </li>
        <drop-down class="nav-item"
                   title="5 Notifications"
                   title-classes="nav-link"
                   icon="ti-bell">
          <a class="dropdown-item">Notification 1</a>
          <a class="dropdown-item">Notification 2</a>
          <a class="dropdown-item">Notification 3</a>
          <a class="dropdown-item">Notification 4</a>
          <a class="dropdown-item">Another notification</a>
        </drop-down>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-settings"></i>
            <p>Settings</p>
          </a>
        </li>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <!-- <content-footer></content-footer> -->
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
import { mapState } from "vuex";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  data() {
    return {
      sidebarLinks: [
        {
          path: '/icons',
          name: 'Dashboard',
          icon: 'ti-panel'
        },
        {
          path: '/votes',
          name: 'Votes',
          icon: 'ti-package'
        },
        {
          path: '/voters',
          name: 'Voters',
          icon: 'ti-hand-open'
        },
        {
          path: '/positions',
          name: 'Positions',
          icon: 'ti-id-badge'
        },
        {
          path: '/candidates',
          name: 'Candidates',
          icon: 'ti-user'
        },
        {
          path: '/ballotposition',
          name: 'Ballot Position',
          icon: 'ti-layout-list-thumb'
        },
        {
          path: '/electionconfigure',
          name: 'Election Configure',
          icon: 'ti-settings'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      role: state => state.user.currentUser.docType
    })
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.value.showSidebar) {
        this.$sidebar.value.displaySidebar(false);
      }
    }
  }
};
</script>
