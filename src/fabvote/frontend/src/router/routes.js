import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import VoterLayout from "@/layout/voter/VoterLayout.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Login from "@/pages/login/index.vue";
import Verify from "@/pages/veriry/index.vue";
import Positions from "@/pages/positions/index.vue";
import Candidates from "@/pages/candidates/index.vue";
import Voters from "@/pages/voters/index.vue";
import Votes from "@/pages/votes/index.vue";
import Electionconfigure from "@/pages/election/index.vue";
import Ballot from "@/pages/balot/index.vue";
import Votervote from "@/pages/votervote/index.vue";
import Stats from "@/pages/stats/index.vue";
import NotFound from "@/pages/NotFoundPage.vue";

import { Authenticate, AuthorizeAdmin, AuthorizeVoter, AuthorizeGuest } from "./middleware/auth";


const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    // meta: {
    //   middleware: [
    //     AuthorizeGuest
    //   ]
    // }
  },
  {
    path: "/verify",
    name: "verify",
    component: Verify,
    props: route => ({email: route.query.email , token: route.query.token})
  },
  {
    path: "/vote-system",
    component: VoterLayout,
    meta: {
      middleware: [
        Authenticate, AuthorizeVoter
      ]
    },
    redirect: "/vote-system/vote",
    children: [
      {
        path: "vote",
        name: "vote",
        component: Votervote,
      },
      {
        path: "stats",
        name: "stats",
        component: Stats
      }
    ]
  },
  {
    path: "/",
    component: DashboardLayout,
    meta: {
      middleware: [
        Authenticate, AuthorizeAdmin
      ]
    },
    redirect: "/dashboard",  
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "votes",
        name: "votes",
        component: Votes
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "icons",
        name: "icons",
        component: Icons
      },
      {
        path: "voters",
        name: "voters",
        component: Voters
      },
      {
        path: "positions",
        name: "positions",
        component: Positions
      },
      {
        path: "candidates",
        name: "candidates",
        component: Candidates
      },
      {
        path: "electionconfigure",
        name: "electionconfigure",
        component: Electionconfigure
      },
      {
        path: "ballotposition",
        name: "ballotposition",
        component: Ballot
      }
    ]
  },
  { 
    path: "/:catchAll(.*)",
    name: "notfound",
    component: NotFound 
  }
];


export default routes;
