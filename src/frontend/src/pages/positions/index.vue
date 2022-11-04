<template>
    <div class="row">
      <div class="col-12">
        <card :title="table1.title" :subTitle="table1.subTitle">
          <el-table :data="filterTableData" style="width: 100%" max-height="50vh">
            <el-table-column label="Name" prop="name" sortable />
            <el-table-column label="Maximum" prop="maximum" />
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
          <el-button class="mt-4" style="width: 100%" @click="dialogFormVisible = true">Add Position</el-button>
        </card>
      </div>
      <div class="col-12">
        <el-dialog v-model="dialogFormVisible" title="Position Dialog">
          <el-form
          class="login-form"
          :model="model"
          :rules="rules"
          ref="form"
          @submit.enter.prevent="login"
          >
            <el-form-item prop="positionname" label="Position name">
              <el-input v-model="model.positionname" placeholder="Input position name">
              </el-input>
            </el-form-item>
            <el-form-item prop="maximum" label="Maximum">
              <el-input-number
                v-model="model.maximum"
                :min="1"
                :max="10"
                controls-position="right"
                size="medium"
              />
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
import { User, Lock } from '@element-plus/icons-vue'
const tableColumns = ["Id", "Name", "Salary", "Country", "City"];
const tableData = [
  {
    id: 1,
    name: "Đại biểu quốc hội khóa XV",
    maximum: 3
  },
  {
    id: 2,
    name: "Đại biểu HĐND tỉnh Lai Châu",
    maximum: 3
  }
];

export default {
  data() {
    return {
      table1: {
        title: "Positions Table",
        subTitle: "All opened positions",
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
        positionname: "",
        maximum: 1
      },
      icon: {
        user: User,
        lock: Lock
      },
      loading: false,
      rules: {
        positionname: [
          {
            required: true,
            message: "Position name is required",
            trigger: "blur"
          },
          {
            min: 4,
            message: "Username length should be at least 5 characters",
            trigger: "blur"
          }
        ],
        maximum: [
          { required: true, message: "Maximum is required", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    filterTableData() {
      return this.table1.data.filter(
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
  },
};
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>