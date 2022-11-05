<template>
  <div class="row">
    <div class="col-12">
      <card :title="table1.title" :subTitle="table1.subTitle">
        <el-table :data="filterTableData" style="width: 100%" max-height="50vh">
          <el-table-column label="Name" prop="name" sortable />
          <el-table-column label="Email" prop="email" sortable />
          <el-table-column label="Voted" prop="voted" sortable />
          <el-table-column align="right">
            <template #header>
              <el-input v-model="search" size="small" placeholder="Type to search" />
            </template>
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button class="mt-4" style="width: 100%" @click="dialogFormVisible = true">Add Voter</el-button>
      </card>
    </div>
    <div class="col-12">
      <el-dialog v-model="dialogFormVisible" title="Candidates Dialog" width="50vw">
        <el-form class="login-form" label-position="left" label-width="6rem" :model="model" :rules="rules" ref="form">
          <el-form-item prop="firstname" label="Firstname">
            <el-input v-model="model.firstname" placeholder="Firstname">
            </el-input>
          </el-form-item>
          <el-form-item prop="lastname" label="Lastname">
            <el-input v-model="model.lastname" placeholder="Lastname">
            </el-input>
          </el-form-item>
          <el-form-item prop="email" label="Email">
            <el-input v-model="model.email" placeholder="Email">
            </el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleCreate" type="primary">Create</el-button>
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import VoterService from '@/services/voter/voter.services';
export default {
  data() {
    return {
      table1: {
        title: "Voters table",
        subTitle: "All voters",
      },
      votersData: {
        rows: [],
      },
      search: '',
      dialogFormVisible: false,
      validCredentials: {
        positionname: "DB HD quan tri",
        maximum: 1
      },
      model: {
        lastname: "",
        firstname: "",
        email: "",
      },
      rules: {
        firstname: [
          { required: true, message: "First name is required", trigger: "blur" }
        ],
        lastname: [
          { required: true, message: "Maximum is required", trigger: "blur" }
        ],
        email: [
          { required: true, message: "Email is required", trigger: "blur" }
        ]
      }
    }
  },
  async created() {
    this.votersData.rows = (await VoterService.getAll()).data.response;
  },
  computed: {
    filterTableData() {
      return this.votersData.rows.filter(
        (data) =>
          !this.search ||
          data.name.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },
  methods: {
    handleEdit: function (index, row) {
      console.log(index, row);
    },
    handleDelete: function (index, row) {
      console.log(index, row)
    },
    handleCreate: async function () {
      console.log('create')
      let valid = await this.$refs.form.validate();
      if (!valid) {
        return
      }
      // Logic with api
    }
  }
}
</script>