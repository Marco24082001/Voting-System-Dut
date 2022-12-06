<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{ routeName }}</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link :to="{ name: 'vote' }" class="nav-link">Vote</router-link>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'stats' }" class="nav-link">Stats</RouterLink>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
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
  async created() {
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
    logout: async function () {
      await AuthenticationService.logout();
      this.$router.go();
    }
  }
};
</script>
<style>

</style>
  