<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{routeName}}</a>
      <button class="navbar-toggler navbar-burger"
              type="button"
              @click="toggleSidebar"
              :aria-expanded="showSidebar"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="ti-panel"></i>
              <p>Stats</p>
            </a>
          </li>
          <drop-down class="nav-item"
                     title="5 Notifications"
                     title-classes="nav-link"
                     icon="ti-bell">
            <a class="dropdown-item" href="#">Notification 1</a>
            <a class="dropdown-item" href="#">Notification 2</a>
            <a class="dropdown-item" href="#">Notification 3</a>
            <a class="dropdown-item" href="#">Notification 4</a>
            <a class="dropdown-item" href="#" @click="logout">Logout</a>
          </drop-down>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="ti-settings"></i>
              <p>
                Settings
              </p>
            </a>
          </li>
        </ul>
      </div>
    </div></nav>
</template>
<script>
import AuthenticationService from "@/services/authentication/authentication.services";
export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
    showSidebar() {
      return this.$sidebar.value.showSidebar;
    }
  },
  data() {
    return {
      activeNotifications: false
    };
  },
  async created(){
    // this.$store
    // console.log(this.$store.state.authentication.accessToken)
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.value.displaySidebar(!this.$sidebar.value.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.value.displaySidebar(false);
    },
    logout: async function() {
      await AuthenticationService.logout();      
      this.$router.go();
    }
  }
};
</script>
<style>
</style>
