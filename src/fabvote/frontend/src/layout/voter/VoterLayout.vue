<template>
    <div class="wrapper">
      <div class="main-panel-voter">
        <!-- <top-navbar></top-navbar>
  
        <voter-content @click.native="toggleSidebar">
  
        </voter-content> -->
        <top-navbar></top-navbar>
        <voter-content></voter-content>
      </div>
    </div>
  </template>
  <style lang="scss">
  </style>
  <script>
  import TopNavbar from "./TopNavbar.vue";
  import ContentFooter from "./ContentFooter.vue";
  import VoterContent from "./Content.vue";
  import { mapState } from "vuex";
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      VoterContent,
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
        role: state => state.user.currentUser.role
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
  