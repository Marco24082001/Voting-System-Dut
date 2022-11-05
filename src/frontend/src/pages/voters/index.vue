<template>
    <div class="row">
        <div class="col-12">
            <card :title="table1.title" :subTitle="table1.subTitle">
                <el-table :data="filterTableData" style="width: 100%" max-height="50vh">
                <el-table-column label="Lastname" prop="lastname" sortable />
                <el-table-column label="Firstname" prop="firstname" sortable/>
                <el-table-column label="Email" prop="email" sortable/>
                <el-table-column label="Voterid" prop="voterid" sortable/>
                <el-table-column label="Hasvoted" prop="has_voted" sortable/>
                <el-table-column align="right">
                    <template #header>
                    <el-input v-model="search" size="small" placeholder="Type to search" />
                    </template>
                    <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                        >Edit</el-button
                    >
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                        >Delete</el-button
                    >
                    </template>
                </el-table-column>
                </el-table>
                <el-button class="mt-4" style="width: 100%" @click="dialogFormVisible = true">Add Voter</el-button>
            </card>
        </div>
        <div class="col-12">
        <el-dialog v-model="dialogFormVisible" title="Candidates Dialog">
          <el-form
          class="login-form"
          :model="model"
          :rules="rules"
          ref="form"
          @submit.enter.prevent="login"
          >
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
            <el-form-item>
              <el-button
                :loading="loading"
                class="login-button"
                type="primary"
                native-type="submit"
                block
              >Create</el-button>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false">Cancel</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
</template>

<script>
const tableColumns = ["Id", "Name", "Salary", "Country", "City"];
const tableData = [
  {
    voterid: "1",
    lastname: "Thanh",
    firstname: "Than",
    email: "thanhthan@gmail.com",
    has_voted: false
  },
  {
    voterid: "2",
    lastname: "Minh",
    firstname: "Tien",
    email: "minhtien@gmail.com",
    has_voted: true
  },
  {
    voterid: "3",
    lastname: "Gia",
    firstname: "Bao",
    email: "giabao@gmail.com",
    has_voted: false
  },
  {
    voterid: "4",
    lastname: "Lan",
    firstname: "Huong",
    email: "lanhuong@gmail.com",
    has_voted: true
  },
];

export default {
    data() {
        return {
            table1 : {
                title: "Voters table",
                subTitle: "All voters",
                columns: [...tableColumns],
                data: [...tableData]
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
    computed: {
    filterTableData() {
      return this.table1.data.filter(
        (data) =>
          !this.search ||
          data.firstname.toLowerCase().includes(this.search.toLowerCase())
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