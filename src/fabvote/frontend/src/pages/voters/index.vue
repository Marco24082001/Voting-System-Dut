<template>
  <div class="row">
    <div class="col-12">
      <card :title="table1.title" :subTitle="table1.subTitle">
        <el-table :data="filterTableData" style="width: 100%" max-height="50vh">
          <el-table-column label="Name" prop="name" sortable />
          <el-table-column label="Email" prop="email" sortable />
          <el-table-column label="Voted" prop="voted" sortable />
          <el-table-column label="Verified" prop="verified" sortable />
          <el-table-column align="right">
            <template #header>
              <el-input v-model="search" size="small" placeholder="Type to search" />
            </template>
            <template #default="scope">
              <el-button size="small" @click="handleDialogEdit(scope.$index, scope.row)">Edit</el-button>
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
          <el-form-item prop="email" label="Email">
            <el-input v-model="model.email" placeholder="Email">
            </el-input>
          </el-form-item>
          <el-form-item prop="name" label="Name">
            <el-input v-model="model.name" placeholder="Name">
            </el-input>
          </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
              <el-button
                v-if="dialogFormStatus === 'create'"
                @click="handleCreate"
                type="primary"
              >Create</el-button>
              <el-button
                v-else
                @click="handleEdit"
                type="primary"
              >Edit</el-button>
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
      votersData: {
        rows: [],
      },
      table1: {
        title: "Voters table",
        subTitle: "All voters",
      },
      search: "",
      dialogFormVisible: false,
      dialogFormStatus: "create",
      dialogFormVisible: false,
      model: {
        email: "",
        name: "",
      },
      editId: "",
      rules: {
        email: [
          { required: true, message: "Email is required", trigger: "blur" }
        ],
        name: [
          { required: true, message: "Name is required", trigger: "blur" }
        ],
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
    resetModel: function() {
      this.model.name = "";
      this.model.email = "";
    },
    handleDialogEdit: function(index, row) {
      this.dialogFormStatus = "edit";
      this.dialogFormVisible = true;
      this.editId = row.id;
      this.model.name = row.name;
      this.model.email = row.email;
    },

    handleDialogCreate: function() {
      this.dialogFormStatus = "create";
      this.dialogFormVisible = true;
      this.resetModel();
    },

    handleGetAll: async function() {
      const res = await VoterService.getAll();
      if (!res.data.error) {
        this.votersData.rows = res.data.response;
      }
      console.log(res.data.response);
    },

    handleCreate: async function () {
      let valid = await this.$refs.form.validate();
      if (!valid) {
        console.log("invalid")
        return
      }
      this.$store.commit("animation/setFullscreenLoading", true);
      const res = await VoterService.create(this.model);
      
      console.log(res.data.error)
      if (!res.data.error) {
        console.log(res)
        this.handleGetAll();
        this.closedialogForm();
      }
      this.$store.commit("animation/setFullscreenLoading", false);
    },

    handleEdit: async function () {
      let valid = await this.$refs.form.validate();
      if (!valid) {
        console.log("invalid")
        return
      }
      this.$store.commit("animation/setFullscreenLoading", true);
      const res = await VoterService.edit({ id:this.editId, ...this.model});
      if (!res.data.error) {
        this.handleGetAll();
        this.closedialogForm();
      }
      this.$store.commit("animation/setFullscreenLoading", false);
    },

    handleDelete: async function (index, row) {
      this.$store.commit("animation/setFullscreenLoading", true);
      const res = await VoterService.delete(row.id);
      if (!res.data.error) {
        this.handleGetAll();
      }
      this.$store.commit("animation/setFullscreenLoading", false);
    },

    closedialogForm: function() {
      this.$refs.form.resetFields();
      this.dialogFormVisible = false;
    }
  }
}
</script>