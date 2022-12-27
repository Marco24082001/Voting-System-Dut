<template>
  <div class="row">
    <div class="col-12">
      <card :title="table1.title" :subTitle="table1.subTitle">
        <el-table :data="filterTableData" style="width: 100%" max-height="50vh">
          <el-table-column label="Candidate" prop="candidate.name" sortable />
          <el-table-column label="Position" prop="position.name" sortable />
          <el-table-column align="right">
            <template #header>
              <el-input v-model="search" size="small" placeholder="Type to search" />
            </template>
            <template #default="scope">
              <el-button size="small" type="info" @click="handleHistory(scope.$index, scope.row)">History</el-button>
            </template>
          </el-table-column>
        </el-table>
      </card>
    </div>
    <el-dialog v-model="dialogHistoryVisible" title="History" width="60vw">
      <el-table :data="voteHistory" style="width: 100%" max-height="50vh">
        <el-table-column label="Time" prop="Timestamp" sortable />
        <el-table-column label="Candidate" prop="Value.owner.name" sortable />
        <el-table-column label="Position" prop="Value.position.name" sortable />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import VoteService from "@/services/vote/vote.services";
import CandidateService from "@/services/candidate/candidate.services";
import PositionService from "@/services/position/position.services";
import CommonService from '@/services/common/common.services';
import { timeConverter } from "@/utils/dateTimeUtils";
export default {
  data() {
    return {
      table1: {
        title: "Votes table",
        subTitle: "All votes",
      },
      votesData: {
        rows: [],
      },
      positions: [],
      candidates: [],
      voteHistory: [],
      dialogHistoryVisible: false,
      search: '',
    }
  },
  async created() {
    this.votesData.rows = (await VoteService.getAll()).data.response;
    this.candidates = (await CandidateService.getAll()).data.response;
    this.positions = (await PositionService.getAll()).data.response;
  },
  computed: {
    filterTableData() {
      return this.votesData.rows.filter(
        (data) =>
          !this.search ||
          data.candidate.name.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },
  methods: {
    handleGetAll: async function () {
      const res = await VoteService.getAll();
      if (!res.data.error) {
        this.votesData.rows = res.data.response;
        console(this.votesData.rows);
      }
    },
    handleHistory: async function (index, row) {
      const res = await CommonService.getHistory(row.id);
      this.voteHistory = res.data.response;
      for (const vote of this.voteHistory) {
        vote.Timestamp = timeConverter(vote.Timestamp.seconds).toLocaleString();
        const position = this.positions.find(item => {
          return item.id === vote.Value.positionId
        })
        const candidate = this.candidates.find(item => {
          return item.id === vote.Value.ownerId
        })
        vote.Value.position = position;
        vote.Value.owner = candidate;
      }
      this.dialogHistoryVisible = true;
    },
  }
}
</script>