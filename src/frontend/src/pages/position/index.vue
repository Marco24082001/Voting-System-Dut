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
        <el-button class="mt-4" style="width: 100%" @click="dialogFormVisible = true">Add Item</el-button>
      </card>
    </div>
    <div class="col-12">
      <el-dialog v-model="dialogFormVisible" title="Shipping address">
        <el-form :model="form">
          <el-form-item label="Promotion name" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Zones" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="Please select a zone">
              <el-option label="Zone No.1" value="shanghai" />
              <el-option label="Zone No.2" value="beijing" />
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">
              Confirm
            </el-button>
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
    id: 1,
    name: "Đại biểu quốc hội khóa XV",
    maximum: 3
  },
  {
    id: 2,
    name: "Đại biểu HĐND tỉnh Lai Châu",
    maximum: 3
  },
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
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
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
    }
  },
};
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>