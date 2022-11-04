<template>
    <div class="row">
        <div class="col-12">
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
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
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
    }
}
</script>