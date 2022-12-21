<template>
  <div class="row">
    <div class="col-12">
      <card :title="table1.title" :subTitle="table1.subTitle">
        <el-table :data="filterTableData" style="width: 100%" max-height="50vh">
          <el-table-column label="Photo">
            <template #default="scope">
              <el-avatar :size="120" shape="square">
                <img :src=scope.row.imageUrl />
              </el-avatar>
            </template>
          </el-table-column>
          <el-table-column label="Name" prop="name" sortable />
          <el-table-column label="Position" prop="position.name" sortable />
          <el-table-column label="Biography" prop="biography">

          </el-table-column>
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
        <el-button class="mt-4" style="width: 100%" @click="handleDialogCreate">Add Candidate</el-button>
      </card>
    </div>
    <div class="col-12">
      <el-dialog v-model="dialogFormVisible" title="Candidates Dialog">
        <el-form class="login-form" label-position="left" label-width="6rem" :model="model" :rules="rules" ref="form">
          <el-form-item prop="imageUrl" label="Avatar">
            <el-upload class="avatar-uploader" :action="uploadImageUrl" :show-file-list="false"
              :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="model.imageUrl" :src="model.imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item prop="name" label="Name">
            <el-input v-model="model.name" placeholder="Input name">
            </el-input>
          </el-form-item>
          <el-form-item prop="biography" label="Biography">
            <el-input v-model="model.biography" placeholder="Input biography">
            </el-input>
            <!-- <QuillEditor v-model:content="this.model.biography"></QuillEditor> -->
          </el-form-item>
          <el-form-item prop="positionId" label="Position">
            <el-select v-model="model.positionId" placeholder="please select position">
              <el-option v-for="item in positions" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
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
        <el-table :data="candidateHistory" style="width: 100%" max-height="50vh">
          <el-table-column label="Time" prop="Timestamp" sortable />
          <el-table-column label="Photo">
            <template #default="scope">
              <el-avatar :size="120" shape="square">
                <img :src=scope.row.Value.imageUrl />
              </el-avatar>
            </template>
          </el-table-column>
          <el-table-column label="Name" prop="Value.name" sortable />
          <el-table-column label="PositionId" prop="Value.positionId" sortable />
          <el-table-column label="Biography" prop="Value.biography"/>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import env from "../../../env";
import CandidateService from "@/services/candidate/candidate.services";
import PositionService from "@/services/position/position.services";
import CommonService from '@/services/common/common.services';
import { timeConverter } from "@/utils/dateTimeUtils";
import { QuillEditor } from "@vueup/vue-quill";
import { uploadImage } from "@/utils/cloudinaryUtils";
import { ElMessage } from 'element-plus'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { Plus } from '@element-plus/icons-vue'
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
  components: {
    QuillEditor,
    Plus
  },
  data() {
    return {
      uploadImageUrl: `${env.API_URL}/candidates/upload`,
      table1: {
        title: "Candidates table",
        subTitle: "All candidates",
        columns: [...tableColumns],
        data: [...tableData]
      },
      candidatesData: {
        rows: [],
      },
      candidateHistory: [],
      positions: [],
      search: "",
      dialogFormVisible: false,
      dialogFormStatus: "create",
      dialogHistoryVisible: false,
      rawFileImage: "",
      validCredentials: {
        positionname: "DB HD quan tri",
        maximum: 1
      },
      model: {
        name: "",
        biography: "",
        positionId: "",
        imageUrl: "",
      },
      rules: {
        name: [
          { required: true, message: "Name is required", trigger: "blur" }
        ],
        biography: [
          { required: true, message: "Biography is required", trigger: "blur" }
        ],
        positionId: [
          { required: true, message: "Position is required", trigger: "blur" }
        ],
        imageUrl: [
          { required: true, message: "Position is required", trigger: "blur" }
        ]
      }
    }
  },
  async created() {
    this.candidatesData.rows = (await CandidateService.getAll()).data.response;
    this.positions = (await PositionService.getAll()).data.response;
  },
  computed: {
    filterTableData() {
      return this.candidatesData.rows.filter(
        (data) =>
          !this.search ||
          data.name.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },
  methods: {
    handleAvatarSuccess: async function (response, uploadFile) {
      this.model.imageUrl = URL.createObjectURL(uploadFile.raw);
      this.rawFileImage = uploadFile.raw;
    },
    beforeAvatarUpload: function (rawFile) {
      if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
        ElMessage.error('Avatar picture must be JPG|PNG format!');
        return false;
      } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!');
        return false;
      }
      return true;
    },
    errorHandler: () => true,
    resetModel: function () {
      this.model.name = "";
      this.model.biography = "";
      this.model.positionId = "";
      this.model.imageUrl = "";
    },
    handleDialogEdit: function (index, row) {
      this.dialogFormStatus = "edit";
      this.dialogFormVisible = true;
      this.editId = row.id;
      this.model.name = row.name;
      this.model.biography = JSON.stringify(row.biography);
      this.model.positionId = row.position.id;
      this.model.imageUrl = row.imageUrl;
    },
    handleDialogCreate: function () {
      this.dialogFormStatus = "create";
      this.dialogFormVisible = true;
      this.resetModel();
    },
    handleGetAll: async function () {
      const res = await CandidateService.getAll();
      if (!res.data.error) {
        this.candidatesData.rows = res.data.response;
      }
    },
    handleEdit: async function () {
      // await this.$refs.form 
      await this.$refs.form.validate(async (valid, fields) => {
        if (valid) {
          this.model.biography = JSON.stringify(this.model.biography);
          if (this.rawFileImage !== "") {
            console.log('upload image')
            try {
              const { url } = await uploadImage(this.rawFileImage);
              this.model.imageUrl = url;
            } catch (error) {
              ElMessage.error('Upload image fail!');
              return
            }
          }
          this.$store.commit("animation/setFullscreenLoading", true);
          const res = await CandidateService.edit({ id: this.editId, ...this.model });
          this.$store.commit("animation/setFullscreenLoading", false);
          if (!res.data.error) {
            this.handleGetAll();
            this.closedialogForm();
          }
        } else {
          console.log("invalid");
        }
      });
      this.rawFileImage = "";
    },
    handleDelete: async function (index, row) {
      this.$store.commit("animation/setFullscreenLoading", true);
      const res = await PositionService.delete(row.id);
      this.$store.commit("animation/setFullscreenLoading", false);
      if (!res.data.error) {
        this.handleGetAll();
      }
    },
    handleCreate: async function () {
      await this.$refs.form.validate(async (valid, fields) => {
        if (valid) {
          this.$store.commit("animation/setFullscreenLoading", true);
          this.model.biography = JSON.stringify(this.model.biography);
          const res = await CandidateService.create(this.model);
          this.$store.commit("animation/setFullscreenLoading", false);
          if (!res.data.error) {
            this.handleGetAll();
            this.closedialogForm();
          }
        } else {
          console.log("invalid");
        }
      });
    },
    handleHistory: async function (index, row) {
      const res = await CommonService.getHistory(row.id);
      this.candidateHistory = res.data.response;
      for(const candidate of this.candidateHistory) {
        candidate.Timestamp = timeConverter(candidate.Timestamp.seconds).toLocaleString();
      }
      this.dialogHistoryVisible = true;
    },
    closedialogForm: function () {
      this.$refs.form.resetFields();
      this.dialogFormVisible = false;
    }
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>