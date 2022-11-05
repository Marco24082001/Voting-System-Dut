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
          </el-table-column>
        </el-table>
      </card>
    </div>
  </div>
</template>

<script>
import VoteService from "@/services/vote/vote.services";
// import { ElMessage } from 'element-plus'
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
      search: '',
    }
  },
  async created() {
    this.votesData.rows = (await VoteService.getAll()).data.response;
    console.log(this.votesData.rows)
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
    handleGetAll: async function() {
      const res = await VoteService.getAll();
      if (!res.data.error) {
        this.votesData.rows = res.data.response;
        console(this.votesData.rows);
      }
    }
  }
}
</script>