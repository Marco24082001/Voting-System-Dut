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
              <el-button size="small" @click="handleDialogEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button size="small" type="info" @click="handleHistory(scope.$index, scope.row)">History</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button class="mt-4" style="width: 100%" @click="handleDialogCreate">Add Position</el-button>
      </card>
    </div>
    <div class="col-12">
      <el-dialog v-model="dialogFormVisible" title="Position Dialog" width="50vw">
        <el-form class="login-form" label-position="left" label-width="7rem" :model="model" :rules="rules" ref="form">
          <el-form-item prop="name" label="Position name">
            <el-input v-model="model.name" placeholder="Input position name">
            </el-input>
          </el-form-item>
          <el-form-item prop="maximum" label="Maximum">
            <el-input-number v-model="model.maximum" :min="1" :max="10" controls-position="right" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button v-if="dialogFormStatus === 'create'" @click="handleCreate" type="primary">Create</el-button>
            <el-button v-else @click="handleEdit" type="primary">Edit</el-button>
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
          </span>
        </template>
      </el-dialog>
      <el-dialog v-model="dialogHistoryVisible" title="History" width="60vw">
        <el-table :data="positionHistory" style="width: 100%" max-height="50vh">
          <el-table-column label="Time" prop="Timestamp" sortable />
          <el-table-column label="Name" prop="Value.name" sortable />
          <el-table-column label="Maximum" prop="Value.maximum" />
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import PositionService from "@/services/position/position.services";
import CommonService from '@/services/common/common.services';
import { timeConverter } from "@/utils/dateTimeUtils";
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
      positionsData: {
        rows: [],
      },
      positionHistory: [],
      table1: {
        title: "Positions Table",
        subTitle: "All positions"
      },
      search: "",
      dialogFormVisible: false,
      dialogFormStatus: "create",
      dialogHistoryVisible: false,
      model: {
        name: "",
        maximum: 1
      },
      editId: "",
      loading: false,
      rules: {
        name: [
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
  async created() {
    const res = await PositionService.getAll();
    this.positionsData.rows = res.data.response;
  },
  computed: {
    filterTableData() {
      return this.positionsData.rows.filter(
        (data) =>
          !this.search ||
          data.name.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },
  methods: {
    resetModel: function () {
      this.model.name = "";
      this.model.maximum = 1;
    },
    handleDialogEdit: function (index, row) {
      this.dialogFormStatus = "edit";
      this.dialogFormVisible = true;
      this.editId = row.id;
      this.model.name = row.name;
      this.model.maximum = row.maximum;
    },
    handleDialogCreate: function () {
      this.dialogFormStatus = "create";
      this.dialogFormVisible = true;
      this.resetModel();
    },
    handleGetAll: async function () {
      const res = await PositionService.getAll();
      if (!res.data.error) {
        this.positionsData.rows = res.data.response;
      }
    },
    handleEdit: async function () {
      let valid = await this.$refs.form.validate();
      if (!valid) {
        console.log("invalid");
        return
      }
      const res = await PositionService.edit({ id: this.editId, ...this.model });
      if (!res.data.error) {
        this.handleGetAll();
        this.closedialogForm();
      }
    },
    handleDelete: async function (index, row) {
      const res = await PositionService.delete(row.id);
      if (!res.data.error) {
        this.handleGetAll();
      }
    },
    handleCreate: async function () {
      let valid = await this.$refs.form.validate();
      if (!valid) {
        console.log("invalid")
        return
      }
      this.$store.commit("animation/setFullscreenLoading", true);
      const res = await PositionService.create(this.model);
      this.$store.commit("animation/setFullscreenLoading", false);
      console.log(res.data.error)
      if (!res.data.error) {
        console.log(res)
        this.handleGetAll();
        this.closedialogForm();
      }
    },
    getData: async function () {
      let responseData = await PositionService.getAll();
      return responseData;
    },
    handleHistory: async function (index, row) {
      const res = await CommonService.getHistory(row.id);
      this.positionHistory = res.data.response;
      for (const position of this.positionHistory) {
        position.Timestamp = timeConverter(position.Timestamp.seconds).toLocaleString();
      }
      this.dialogHistoryVisible = true;
    },
    closedialogForm: function () {
      this.$refs.form.resetFields();
      this.dialogFormVisible = false;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>