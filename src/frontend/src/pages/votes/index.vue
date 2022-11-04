<template>
    <div class="row">
        <div class="col-12">
            <card :title="table1.title" :subTitle="table1.subTitle">
                <el-table :data="filterTableData" style="width: 100%" max-height="50vh">
                    <el-table-column label="Id" prop="id" sortable />
                    <el-table-column label="Lastname" prop="lastname" sortable />
                    <el-table-column label="Firstname" prop="firstname" sortable/>
                    <el-table-column label="Position" prop="position" sortable/>
                </el-table>
            </card>
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
    position: "Đại biểu quốc hội khóa XV"
  },
  {
    id: "2",
    lastname: "Minh",
    firstname: "Trung",
    position: "Đại biểu quốc hội khóa XV",
  },
  {
    id: "3",
    lastname: "Minh",
    firstname: "Ngoan",
    position: "Đại biểu HĐND tỉnh Lai Châu",
  },
  {
    id: "4",
    lastname: "Loan",
    firstname: "Huong",
    position: "Đại biểu HĐND tỉnh Lai Châu",
  },
];

export default {
    data() {
        return {
            table1 : {
                title: "Votes table",
                subTitle: "All votes",
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