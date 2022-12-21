<template>
  <div>
    <!--Stats cards-->
    <el-row class="mb-4">
      <el-col :span="24" align="right">
        <el-popconfirm confirm-button-text="Yes" cancel-button-text="No" :icon="InfoFilled" width="150" icon-color="#626AEF"
          title="Are you sure refresh to start a new election?" @confirm="refresh">
          <template #reference>
            <el-button type="danger">Refresh</el-button>
          </template>
        </el-popconfirm>
      </el-col>
    </el-row>
    <div class="row">
      <div class="col-md-6 col-xl-3" v-for="stats in statsCards" :key="stats.title">
        <stats-card>
          <template v-slot:header>
            <div class="icon-big text-center" :class="`icon-${stats.type}`">
              <i :class="stats.icon"></i>
            </div>
          </template>
          <template v-slot:content>
            <div class="numbers">
              <p>{{ stats.title }}</p>
              {{ stats.value }}
            </div>
          </template>
          <template v-slot:footer>
            <div class="stats">
              <i :class="stats.footerIcon"></i> {{ stats.footerText }}
            </div>
          </template>
        </stats-card>
      </div>
    </div>

    <!--Charts-->
    <div class="row">
      <div v-for="(position, index) in positionsData" class="col-12 mt-5" :key="index">
        <BarChart :position="position" :votes="votesData" :candidates="candidatesData" />
      </div>

    </div>

  </div>
</template>
<script>
import CandidateService from "@/services/candidate/candidate.services";
import VoterService from "@/services/voter/voter.services";
import PositionService from "@/services/position/position.services";
import VoteService from "@/services/vote/vote.services";
import ElectionService from "@/services/election/election.services";
import { StatsCard } from "@/components/index";
import BarChart from '@/components/Cards/BarChart.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  components: {
    StatsCard,
    BarChart
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      positionsData: [],
      candidatesData: [],
      votersData: [],
      votesData: [],
      statsCards: [
        {
          type: "warning",
          icon: "ti-package",
          title: "Voters Voted",
          value: "20",
          footerText: "Updated now",
          footerIcon: "ti-reload"
        },
        {
          type: "success",
          icon: "ti-user",
          title: "No. of Candidates",
          value: "6",
          footerText: "Updated now",
          footerIcon: "ti-reload"
        },
        {
          type: "danger",
          icon: "ti-hand-open",
          title: "Total Voters",
          value: "23",
          footerText: "Updated now",
          footerIcon: "ti-reload"
        },
        {
          type: "info",
          icon: "ti-id-badge",
          title: "No. of Positions",
          value: "2",
          footerText: "Updated now",
          footerIcon: "ti-reload"
        }
      ]
    };
  },

  async created() {
    this.candidatesData = (await CandidateService.getAll()).data.response;
    this.votesData = (await VoteService.getAll()).data.response;
    this.positionsData = (await PositionService.getAll()).data.response;
    this.votersData = (await VoterService.getAll()).data.response;
    this.loadCountItem();
  },
  computed: {
    votersVoted() {
      return this.votersData.filter(
        (data) => data.voted === "true"
      )
    }
  },
  methods: {
    loadCountItem: async function () {
      this.statsCards[0].value = this.votersVoted.length;
      this.statsCards[1].value = this.candidatesData.length;
      this.statsCards[2].value = this.votersData.length;
      this.statsCards[3].value = this.positionsData.length;
    },
    loadData: async function () {
      this.candidatesData = (await CandidateService.getAll()).data.response;
      this.votesData = (await VoteService.getAll()).data.response;
      this.positionsData = (await PositionService.getAll()).data.response;
      this.votersData = (await VoterService.getAll()).data.response;
      this.loadCountItem();
    },
    refresh: async function () {
      this.$store.commit("animation/setFullscreenLoading", true);
      await ElectionService.reset();
      this.$store.commit("animation/setFullscreenLoading", false);
      ElMessage({
        type: 'info',
        message: `success`,
      })
    }
  }
};
</script>
<style>

</style>
