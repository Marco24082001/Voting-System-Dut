<template>
    <div class="row">
        <div class="col-12">
            <card :title="table1.title" :subTitle="table1.subTitle">
                <el-table :data="filterTableData" style="width: 100%" max-height="50vh">
                <el-table-column label="Id" prop="id" sortable/>
                <el-table-column label="Lastname" prop="lastname" sortable />
                <el-table-column label="Firstname" prop="firstname" sortable/>
                <el-table-column label="Position" prop="position" sortable/>
                <el-table-column label="Biography" prop="biography" />
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
                <el-button class="mt-4" style="width: 100%" @click="dialogFormVisible = true">Add Candidate</el-button>
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
              <el-input v-model="model.firstname" placeholder="Input firstname">
              </el-input>
            </el-form-item>
            <el-form-item prop="lastname" label="Lastname">
                <el-input v-model="model.lastname" placeholder="Input lastname">
                </el-input>
            </el-form-item>
            <el-form-item prop="biography" label="Biography">
                <el-input v-model="model.biography" placeholder="Input biography">
                </el-input>
            </el-form-item>
            <el-form-item prop="position" label="Position">
              <el-select v-model="model.selected_position" placeholder="please select position">
                <el-option 
                  v-for="item in positions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
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
    id: "1",
    lastname: "Thanh",
    firstname: "Vi",
    position: "Đại biểu quốc hội khóa XV",
    biography: "Mot nguoi tot",
  },
  {
    id: "2",
    lastname: "Minh",
    firstname: "Trung",
    position: "Đại biểu quốc hội khóa XV",
    biography: "Mot nguoi tot",
  },
  {
    id: "3",
    lastname: "Gia",
    firstname: "Long",
    position: "Đại biểu quốc hội khóa XV",
    biography: "Mot nguoi tot",
  },
  {
    id: "4",
    lastname: "Huy",
    firstname: "Hoang",
    position: "Đại biểu quốc hội khóa XV",
    biography: "Mot nguoi tot",
  },
  {
    id: "5",
    lastname: "Bich",
    firstname: "Chi",
    position: "Đại biểu quốc hội khóa XV",
    biography: "Mot nguoi tot",
  },
  {
    id: "6",
    lastname: "Minh",
    firstname: "Ngoan",
    position: "Đại biểu HĐND tỉnh Lai Châu",
    biography: "Mot nguoi tot",
  },
  {
    id: "7",
    lastname: "Loan",
    firstname: "Huong",
    position: "Đại biểu HĐND tỉnh Lai Châu",
    biography: "Mot nguoi tot",
  },
  {
    id: "8",
    lastname: "Thanh",
    firstname: "Hieu",
    position: "Đại biểu HĐND tỉnh Lai Châu",
    biography: "Mot nguoi tot",
  },
  {
    id: "9",
    lastname: "Huu",
    firstname: "Bang",
    position: "Đại biểu HĐND tỉnh Lai Châu",
    biography: "Mot nguoi tot",
  },
  {
    id: "10",
    lastname: "Dang",
    firstname: "Khoi",
    position: "Đại biểu HĐND tỉnh Lai Châu",
    biography: "Mot nguoi tot",
  },
];

export default {
    data() {
        return {
            table1 : {
                title: "Candidates table",
                subTitle: "All candidates",
                columns: [...tableColumns],
                data: [...tableData]
            },
            positions : [
              {
                value: 1,
                label: 'Đại biểu quốc hội khóa XV'
              },
              {
                value: 2,
                label: 'Đại biểu HĐND tỉnh Lai Châu'
              }
            ],
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
                biography: "",
                selected_position: 1,
            },
            rules: {
                firstname: [
                    { required: true, message: "First name is required", trigger: "blur" }
                ],
                lastname: [
                    { required: true, message: "Last name is required", trigger: "blur" }
                ],
                email: [
                    { required: true, message: "Email is required", trigger: "blur" }
                ],
                biography: [
                    { required: true, message: "Biography is required", trigger: "blur" }
                ],
                position: [
                    { required: true, message: "Position is required", trigger: "blur"}
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